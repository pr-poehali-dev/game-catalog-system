import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage shopping cart - add/remove items, get cart contents
    Args: event - dict with httpMethod, body, headers (X-User-Id)
          context - object with request_id attribute
    Returns: HTTP response with cart data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers = event.get('headers', {})
    user_id = headers.get('x-user-id') or headers.get('X-User-Id')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'User ID required'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        cursor.execute('''
            SELECT ua.id, ua.game_id, g.title, g.developer, g.price, g.image_url
            FROM user_actions ua
            JOIN games g ON ua.game_id = g.id
            WHERE ua.user_id = %s AND ua.action_type = 'add_to_cart'
            ORDER BY ua.created_at DESC
        ''', (user_id,))
        
        cart_items = cursor.fetchall()
        
        items_list = []
        total = 0
        for item in cart_items:
            price = float(item['price'])
            items_list.append({
                'id': item['id'],
                'gameId': item['game_id'],
                'title': item['title'],
                'developer': item['developer'],
                'price': price,
                'image': item['image_url']
            })
            total += price
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'items': items_list, 'total': total, 'count': len(items_list)}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        game_id = body_data.get('gameId')
        
        if not game_id:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Game ID required'}),
                'isBase64Encoded': False
            }
        
        cursor.execute('''
            INSERT INTO user_actions (user_id, action_type, game_id, details)
            VALUES (%s, 'add_to_cart', %s, %s)
            RETURNING id
        ''', (user_id, game_id, json.dumps({'timestamp': 'now'})))
        
        result = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'cartItemId': result['id']}),
            'isBase64Encoded': False
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        cart_item_id = params.get('id')
        
        if not cart_item_id:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Cart item ID required'}),
                'isBase64Encoded': False
            }
        
        cursor.execute('''
            UPDATE user_actions 
            SET action_type = 'removed_from_cart'
            WHERE id = %s AND user_id = %s AND action_type = 'add_to_cart'
        ''', (cart_item_id, user_id))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
