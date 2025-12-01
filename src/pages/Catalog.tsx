import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import GameCard, { Game } from '@/components/GameCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { gamesData } from '@/data/gamesData';
import { toast } from 'sonner';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const [cart, setCart] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('popular');

  const handleAddToCart = (game: Game) => {
    setCart([...cart, game]);
    toast.success(`${game.title} добавлена в корзину!`);
  };

  const filteredGames = useMemo(() => {
    let filtered = [...gamesData];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.developer.toLowerCase().includes(query) ||
          game.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cart.length} />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-montserrat text-5xl font-bold mb-4">Каталог игр</h1>
          <p className="text-muted-foreground text-lg">
            Найдено игр: {filteredGames.length}
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

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
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
