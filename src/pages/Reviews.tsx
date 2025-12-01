import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const reviews = [
  {
    id: 1,
    user: 'Алексей К.',
    game: 'Cyber Legends: Neon Warriors',
    rating: 5,
    date: '20.11.2024',
    text: 'Невероятная игра! Графика на высшем уровне, геймплей затягивает. Уже 50 часов наиграл и не могу оторваться.',
  },
  {
    id: 2,
    user: 'Мария С.',
    game: 'Fantasy Quest: Dragon Age',
    rating: 5,
    date: '18.11.2024',
    text: 'Лучшая RPG за последние годы. Сюжет просто шикарный, много квестов и интересных персонажей.',
  },
  {
    id: 3,
    user: 'Дмитрий В.',
    game: 'Racing Fury',
    rating: 4,
    date: '15.11.2024',
    text: 'Отличный симулятор гонок. Физика машин реалистична, треки разнообразные. Минус только в отсутствии некоторых режимов.',
  },
  {
    id: 4,
    user: 'Екатерина П.',
    game: 'Horror Mansion',
    rating: 5,
    date: '12.11.2024',
    text: 'Страшно, атмосферно, напряженно! Именно то, что нужно для хоррора. Рекомендую проходить с наушниками.',
  },
];

export default function Reviews() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-montserrat text-5xl font-bold mb-4">Отзывы покупателей</h1>
          <p className="text-muted-foreground text-lg">
            Более 10,000 довольных игроков по всему миру
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover-scale">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-game-purple to-game-magenta text-white">
                        {review.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.user}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={`${
                          i < review.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <Badge variant="secondary" className="mb-3">
                  {review.game}
                </Badge>

                <p className="text-muted-foreground">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-gradient-to-r from-game-purple/20 via-game-magenta/20 to-game-orange/20 border-game-purple/30">
          <CardContent className="p-8 text-center">
            <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-game-purple" />
            <h3 className="font-montserrat text-2xl font-bold mb-2">
              Поделитесь своим мнением
            </h3>
            <p className="text-muted-foreground mb-4">
              Купили игру? Оставьте отзыв и помогите другим игрокам сделать выбор
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
