import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function About() {
  const features = [
    {
      icon: 'Zap',
      title: 'Мгновенная доставка',
      description: 'Получайте ключи моментально после оплаты',
    },
    {
      icon: 'Shield',
      title: 'Гарантия качества',
      description: 'Все ключи проверены и лицензионные',
    },
    {
      icon: 'CreditCard',
      title: 'Безопасные платежи',
      description: 'Поддержка всех популярных методов оплаты',
    },
    {
      icon: 'Headphones',
      title: 'Поддержка 24/7',
      description: 'Всегда готовы помочь с любым вопросом',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="font-montserrat text-6xl font-bold mb-6 text-gradient">
            О GameStore
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Мы — крупнейший цифровой магазин игр с более чем 10,000 довольных клиентов.
            С 2020 года предоставляем доступ к лучшим играм по конкурентным ценам.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 text-center hover-scale hover-glow card-gradient"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-game-purple to-game-magenta flex items-center justify-center">
                <Icon name={feature.icon as any} size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-12 bg-gradient-to-r from-game-purple/10 to-game-magenta/10 border-game-purple/30">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-gradient mb-2">50,000+</div>
              <p className="text-muted-foreground">Довольных покупателей</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-gradient mb-2">10,000+</div>
              <p className="text-muted-foreground">Игр в каталоге</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-gradient mb-2">4.9</div>
              <p className="text-muted-foreground">Средний рейтинг</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
