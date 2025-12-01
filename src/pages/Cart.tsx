import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success('Товар удален из корзины');
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    toast.success('Переход к оформлению заказа...', {
      description: 'Функция оформления заказа будет доступна скоро',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItems.length} />

      <div className="container py-8">
        <h1 className="font-montserrat text-5xl font-bold mb-8">Корзина</h1>

        {cartItems.length === 0 ? (
          <Card className="p-12 text-center">
            <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">Корзина пуста</h3>
            <p className="text-muted-foreground mb-6">
              Добавьте игры из каталога, чтобы оформить заказ
            </p>
            <Link to="/catalog">
              <Button className="bg-gradient-to-r from-game-purple to-game-magenta">
                <Icon name="Gamepad2" size={18} className="mr-2" />
                Перейти в каталог
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-32 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-2xl font-bold text-game-purple mb-4">
                          {item.price}₽
                        </p>
                        <div className="flex items-center gap-3">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-destructive hover:text-destructive"
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="font-bold text-2xl mb-6">Итого</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Товаров:</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Подытог:</span>
                    <span>{total}₽</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Итого:</span>
                    <span className="text-game-purple">{total}₽</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-game-purple to-game-magenta hover:from-game-magenta hover:to-game-purple"
                  onClick={handleCheckout}
                >
                  <Icon name="CreditCard" size={18} className="mr-2" />
                  Оформить заказ
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Принимаем PayPal, Stripe и банковские карты
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
