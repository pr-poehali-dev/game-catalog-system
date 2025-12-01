import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { getCart, removeFromCart, createOrder } from '@/lib/api';

interface CartItem {
  id: number;
  gameId: number;
  title: string;
  developer: string;
  image: string;
  price: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCartItems(data.items || []);
    } catch (error) {
      toast.error('Ошибка загрузки корзины');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await removeFromCart(id);
      toast.success('Товар удален из корзины');
      loadCart();
    } catch (error) {
      toast.error('Ошибка удаления товара');
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Корзина пуста');
      return;
    }

    try {
      setProcessing(true);
      
      const orderItems = cartItems.map(item => ({
        gameId: item.gameId,
        price: item.price
      }));
      
      const result = await createOrder(orderItems);
      
      toast.success('Заказ успешно оформлен!', {
        description: `Номер заказа: #${result.orderId}. Ключи доступны в профиле.`,
      });
      
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error) {
      toast.error('Ошибка оформления заказа');
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={0} />
        <div className="container py-20 text-center">
          <Icon name="Loader2" size={64} className="mx-auto mb-4 text-game-purple animate-spin" />
          <p className="text-muted-foreground">Загрузка корзины...</p>
        </div>
      </div>
    );
  }

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
                <Card key={item.id} className="overflow-hidden hover-scale">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-32 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.developer}</p>
                        <p className="text-2xl font-bold text-game-purple mb-4">
                          {item.price}₽
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Icon name="Trash2" size={18} className="mr-2" />
                          Удалить
                        </Button>
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
                    <span>{total.toFixed(2)}₽</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Итого:</span>
                    <span className="text-game-purple">{total.toFixed(2)}₽</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-game-purple to-game-magenta hover:from-game-magenta hover:to-game-purple"
                  onClick={handleCheckout}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Icon name="CreditCard" size={18} className="mr-2" />
                      Оформить заказ
                    </>
                  )}
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
