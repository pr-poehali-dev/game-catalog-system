import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import GameCard, { Game } from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { gamesData, categories } from '@/data/gamesData';
import { toast } from 'sonner';

export default function Index() {
  const [cart, setCart] = useState<Game[]>([]);

  const handleAddToCart = (game: Game) => {
    setCart([...cart, game]);
    toast.success(`${game.title} добавлена в корзину!`, {
      description: `Цена: ${game.price}₽`,
    });
  };

  const featuredGames = gamesData.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cart.length} />

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/31eeeeb4-c765-4558-8abf-653db276f611/files/c831d97b-ff80-49f9-a1f4-b3d6ad0b1beb.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        
        <div className="relative z-10 container text-center space-y-6 animate-fade-in">
          <h1 className="font-montserrat text-6xl md:text-8xl font-black text-gradient">
            GAME STORE
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Тысячи игр по лучшим ценам. Мгновенная доставка ключей.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/catalog">
              <Button size="lg" className="bg-gradient-to-r from-game-purple to-game-magenta hover:from-game-magenta hover:to-game-purple text-lg px-8 hover-scale">
                <Icon name="Gamepad2" size={20} className="mr-2" />
                Каталог игр
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 hover-scale border-game-purple/50 hover:bg-game-purple/10">
                Узнать больше
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-montserrat text-4xl font-bold mb-2">Популярные категории</h2>
            <p className="text-muted-foreground">Найдите игры по жанрам</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.name} to={`/catalog?category=${encodeURIComponent(category.name)}`}>
              <Card className="p-6 text-center hover-scale hover-glow bg-card border-border/50 hover:border-game-purple/50 transition-all duration-300 card-gradient">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-game-purple to-game-magenta flex items-center justify-center">
                    <Icon name={category.icon as any} size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} игр</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-montserrat text-4xl font-bold mb-2">Топ продаж</h2>
            <p className="text-muted-foreground">Самые популярные игры месяца</p>
          </div>
          <Link to="/catalog">
            <Button variant="outline" className="hover-scale border-game-purple/50 hover:bg-game-purple/10">
              Смотреть все
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.map((game, index) => (
            <div key={game.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <GameCard game={game} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <Card className="relative overflow-hidden bg-gradient-to-r from-game-purple/20 via-game-magenta/20 to-game-orange/20 border-game-purple/30">
          <div className="p-12 text-center space-y-4">
            <div className="inline-block">
              <Badge className="bg-game-magenta text-white text-sm px-4 py-1 mb-4">
                Новым пользователям
              </Badge>
            </div>
            <h2 className="font-montserrat text-4xl font-bold">Скидка 20% на первую покупку!</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Зарегистрируйтесь и получите промокод на скидку для первого заказа
            </p>
            <div className="pt-4">
              <Link to="/profile">
                <Button size="lg" className="bg-gradient-to-r from-game-magenta to-game-orange hover:from-game-orange hover:to-game-magenta text-lg px-8 hover-scale">
                  <Icon name="Gift" size={20} className="mr-2" />
                  Получить скидку
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      <footer className="border-t border-border/40 bg-card/30 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-game-purple to-game-magenta">
                  <Icon name="Gamepad2" size={24} className="text-white" />
                </div>
                <span className="font-montserrat text-xl font-bold text-gradient">GameStore</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Лучший магазин цифровых игр с моментальной доставкой ключей
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-game-purple transition-colors">О нас</Link></li>
                <li><Link to="/contacts" className="hover:text-game-purple transition-colors">Контакты</Link></li>
                <li><Link to="/support" className="hover:text-game-purple transition-colors">Поддержка</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Покупателям</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/catalog" className="hover:text-game-purple transition-colors">Каталог</Link></li>
                <li><Link to="/reviews" className="hover:text-game-purple transition-colors">Отзывы</Link></li>
                <li><Link to="/profile" className="hover:text-game-purple transition-colors">Личный кабинет</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Мы в соцсетях</h3>
              <div className="flex space-x-3">
                <Button size="icon" variant="outline" className="hover-scale border-game-purple/50">
                  <Icon name="Twitter" size={18} />
                </Button>
                <Button size="icon" variant="outline" className="hover-scale border-game-purple/50">
                  <Icon name="Facebook" size={18} />
                </Button>
                <Button size="icon" variant="outline" className="hover-scale border-game-purple/50">
                  <Icon name="Instagram" size={18} />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            © 2024 GameStore. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
