import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success('Вход выполнен успешно!');
  };

  const purchaseHistory = [
    { id: 1, title: 'Cyber Legends: Neon Warriors', date: '15.11.2024', price: 1999 },
    { id: 2, title: 'Fantasy Quest: Dragon Age', date: '10.11.2024', price: 2499 },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-montserrat text-center">
                  Вход в аккаунт
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-game-purple to-game-magenta"
                  onClick={handleLogin}
                >
                  Войти
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Нет аккаунта?{' '}
                  <button className="text-game-purple hover:underline">
                    Зарегистрироваться
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <h1 className="font-montserrat text-5xl font-bold mb-8">Личный кабинет</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="wishlist">Желаемое</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-game-purple to-game-magenta flex items-center justify-center">
                      <Icon name="User" size={32} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-xl">Игрок #1337</p>
                      <p className="text-muted-foreground">player@gamestore.com</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Имя</Label>
                    <Input defaultValue="Игрок" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue="player@gamestore.com" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-game-purple to-game-magenta">
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Бонусы и скидки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-game-purple/20 to-game-magenta/20 border border-game-purple/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Бонусные баллы</span>
                      <Icon name="Trophy" size={20} className="text-game-orange" />
                    </div>
                    <p className="text-3xl font-bold">1,250</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Активные промокоды</h4>
                    <Badge className="bg-game-magenta text-white">
                      NEWUSER20 - Скидка 20%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>История покупок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-game-purple/50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{order.title}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-game-purple">{order.price}₽</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          <Icon name="Download" size={14} className="mr-1" />
                          Ключ
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist">
            <Card className="p-12 text-center">
              <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">Список желаемого пуст</h3>
              <p className="text-muted-foreground">
                Добавляйте игры в избранное, чтобы не потерять их
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
