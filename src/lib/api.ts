const API_BASE = 'https://functions.poehali.dev';

const ENDPOINTS = {
  games: '6a366217-34f6-4a44-b6e1-0c1e2f03f738',
  cart: 'a568ca01-f58d-411b-924d-7a46e71a9a7a',
  orders: 'cf7d20b4-b3ae-4317-9763-efa3b2fc130c',
};

export function getUserId(): string {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', userId);
  }
  return userId;
}

export async function fetchGames(search?: string, sort?: string) {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (sort) params.append('sort', sort);
  
  const url = `${API_BASE}/${ENDPOINTS.games}${params.toString() ? `?${params}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  
  return response.json();
}

export async function getCart() {
  const userId = getUserId();
  const response = await fetch(`${API_BASE}/${ENDPOINTS.cart}`, {
    headers: {
      'X-User-Id': userId,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  
  return response.json();
}

export async function addToCart(gameId: number) {
  const userId = getUserId();
  const response = await fetch(`${API_BASE}/${ENDPOINTS.cart}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify({ gameId }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add to cart');
  }
  
  return response.json();
}

export async function removeFromCart(cartItemId: number) {
  const userId = getUserId();
  const response = await fetch(`${API_BASE}/${ENDPOINTS.cart}?id=${cartItemId}`, {
    method: 'DELETE',
    headers: {
      'X-User-Id': userId,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to remove from cart');
  }
  
  return response.json();
}

export async function createOrder(cartItems: any[]) {
  const userId = getUserId();
  const response = await fetch(`${API_BASE}/${ENDPOINTS.orders}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify({ cartItems }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  
  return response.json();
}

export async function getOrders() {
  const userId = getUserId();
  const response = await fetch(`${API_BASE}/${ENDPOINTS.orders}`, {
    headers: {
      'X-User-Id': userId,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  
  return response.json();
}
