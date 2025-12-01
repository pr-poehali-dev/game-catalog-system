import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get games catalog from database with filtering and search
    Args: event - dict with httpMethod, queryStringParameters
          context - object with request_id attribute
    Returns: HTTP response with games list
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    search = params.get('search', '')
    sort_by = params.get('sort', 'popular')
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    query = 'SELECT id, title, developer, price, original_price, discount, image_url, rating, tags FROM games WHERE 1=1'
    
    if search:
        search_lower = search.lower()
        query += f" AND (LOWER(title) LIKE '%{search_lower}%' OR LOWER(developer) LIKE '%{search_lower}%')"
    
    if sort_by == 'price-asc':
        query += ' ORDER BY price ASC'
    elif sort_by == 'price-desc':
        query += ' ORDER BY price DESC'
    elif sort_by == 'rating':
        query += ' ORDER BY rating DESC'
    else:
        query += ' ORDER BY rating DESC, id ASC'
    
    cursor.execute(query)
    games = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    games_list = []
    for game in games:
        games_list.append({
            'id': game['id'],
            'title': game['title'],
            'developer': game['developer'],
            'price': float(game['price']),
            'originalPrice': float(game['original_price']) if game['original_price'] else None,
            'discount': game['discount'],
            'image': game['image_url'],
            'rating': float(game['rating']),
            'tags': game['tags'] or []
        })
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'games': games_list}),
        'isBase64Encoded': False
    }
