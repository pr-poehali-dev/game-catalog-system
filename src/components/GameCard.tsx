import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface Game {
  id: number;
  title: string;
  developer: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  tags: string[];
  discount?: number;
}

interface GameCardProps {
  game: Game;
  onAddToCart: (game: Game) => void;
}

export default function GameCard({ game, onAddToCart }: GameCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart(game);
  };

  return (
    <Link to={`/game/${game.id}`}>
      <Card className="group overflow-hidden hover-scale bg-card border-border/50 hover:border-game-purple/50 transition-all duration-300 hover-glow">
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {game.discount && (
            <Badge className="absolute top-3 right-3 bg-game-orange text-white font-bold">
              -{game.discount}%
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-4 space-y-2">
          <h3 className="font-montserrat font-bold text-lg line-clamp-1 group-hover:text-game-purple transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-muted-foreground">{game.developer}</p>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{game.rating}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {game.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {game.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {game.originalPrice}₽
              </span>
            )}
            <span className="text-xl font-bold text-game-purple">
              {game.price}₽
            </span>
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-game-purple to-game-magenta hover:from-game-magenta hover:to-game-purple transition-all duration-300"
          >
            <Icon name="ShoppingCart" size={16} className="mr-1" />
            В корзину
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
