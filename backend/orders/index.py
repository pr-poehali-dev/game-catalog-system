import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
import uuid

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Create and manage orders, generate game keys after purchase
    Args: event - dict with httpMethod, body, headers (X-User-Id)
          context - object with request_id attribute
    Returns: HTTP response with order data
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
            SELECT o.id, o.total_amount, o.status, o.created_at,
                   json_agg(json_build_object(
                       'gameId', oi.game_id,
                       'title', g.title,
                       'price', oi.price,
                       'gameKey', oi.game_key
                   )) as items
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN games g ON oi.game_id = g.id
            WHERE o.user_id = %s
            GROUP BY o.id
            ORDER BY o.created_at DESC
        ''', (user_id,))
        
        orders = cursor.fetchall()
        
        orders_list = []
        for order in orders:
            orders_list.append({
                'id': order['id'],
                'totalAmount': float(order['total_amount']),
                'status': order['status'],
                'createdAt': order['created_at'].isoformat() if order['created_at'] else None,
                'items': order['items'] if order['items'] else []
            })
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'orders': orders_list}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        cart_items = body_data.get('cartItems', [])
        
        if not cart_items:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Cart is empty'}),
                'isBase64Encoded': False
            }
        
        total_amount = sum(item.get('price', 0) for item in cart_items)
        
        cursor.execute('''
            INSERT INTO orders (user_id, total_amount, status)
            VALUES (%s, %s, 'completed')
            RETURNING id
        ''', (user_id, total_amount))
        
        order = cursor.fetchone()
        order_id = order['id']
        
        for item in cart_items:
            game_key = f"GAME-{uuid.uuid4().hex[:8].upper()}-{uuid.uuid4().hex[:8].upper()}"
            
            cursor.execute('''
                INSERT INTO order_items (order_id, game_id, price, game_key)
                VALUES (%s, %s, %s, %s)
            ''', (order_id, item['gameId'], item['price'], game_key))
        
        cursor.execute('''
            UPDATE user_actions 
            SET action_type = 'purchased'
            WHERE user_id = %s AND action_type = 'add_to_cart'
        ''', (user_id,))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'orderId': order_id,
                'message': 'Order created successfully'
            }),
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
