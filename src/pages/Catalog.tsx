import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import GameCard, { Game } from '@/components/GameCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { fetchGames, addToCart, getCart } from '@/lib/api';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
    loadCart();
  }, [sortBy]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadGames();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadGames = async () => {
    try {
      setLoading(true);
      const data = await fetchGames(searchQuery, sortBy);
      setGames(data.games || []);
    } catch (error) {
      toast.error('Ошибка загрузки игр');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCartCount(data.count || 0);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const handleAddToCart = async (game: Game) => {
    try {
      await addToCart(game.id);
      toast.success(`${game.title} добавлена в корзину!`);
      loadCart();
    } catch (error) {
      toast.error('Ошибка добавления в корзину');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartCount} />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-montserrat text-5xl font-bold mb-4">Каталог игр</h1>
          <p className="text-muted-foreground text-lg">
            Найдено игр: {games.length}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск по названию, разработчику или тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-64 bg-card">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Популярные</SelectItem>
              <SelectItem value="rating">По рейтингу</SelectItem>
              <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
              <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
            </SelectContent>
          </Select>

          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => setSearchQuery('')}
              className="border-game-purple/50"
            >
              <Icon name="X" size={18} className="mr-2" />
              Сбросить
            </Button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <Icon name="Loader2" size={64} className="mx-auto mb-4 text-game-purple animate-spin" />
            <p className="text-muted-foreground">Загрузка игр...</p>
          </div>
        ) : games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} game={game} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold mb-2">Игры не найдены</h3>
            <p className="text-muted-foreground mb-6">
              Попробуйте изменить параметры поиска
            </p>
            <Button onClick={() => setSearchQuery('')} variant="outline">
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
