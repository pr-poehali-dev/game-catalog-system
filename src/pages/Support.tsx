import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

export default function Support() {
  const faqs = [
    {
      question: 'Как получить ключ после покупки?',
      answer: 'После успешной оплаты ключ появится в личном кабинете в разделе "Мои покупки". Также ключ будет отправлен на вашу электронную почту.',
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем PayPal, Stripe, банковские карты Visa/Mastercard, а также электронные кошельки и криптовалюты.',
    },
    {
      question: 'Могу ли я вернуть игру?',
      answer: 'Возврат средств возможен в течение 14 дней после покупки, если ключ не был активирован и игра не запускалась.',
    },
    {
      question: 'Как активировать ключ?',
      answer: 'Скопируйте ключ из личного кабинета, откройте Steam/Epic Games/Origin и выберите "Активировать продукт". Вставьте ключ и следуйте инструкциям.',
    },
    {
      question: 'Работает ли служба поддержки круглосуточно?',
      answer: 'Да, наша служба поддержки работает 24/7. Вы можете связаться с нами через чат на сайте, email или телефон.',
    },
    {
      question: 'Как получить скидку на первую покупку?',
      answer: 'Зарегистрируйтесь на сайте, и вы автоматически получите промокод NEWUSER20 на скидку 20% для первого заказа.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-montserrat text-5xl font-bold mb-4">
              Центр поддержки
            </h1>
            <p className="text-xl text-muted-foreground">
              Ответы на часто задаваемые вопросы
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Популярные вопросы</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-game-purple">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6 hover-scale card-gradient">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-game-purple to-game-magenta flex items-center justify-center">
                <Icon name="MessageCircle" size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Онлайн-чат</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Мгновенные ответы от операторов
              </p>
              <Button variant="outline" size="sm" className="border-game-purple/50">
                Открыть чат
              </Button>
            </Card>

            <Card className="text-center p-6 hover-scale card-gradient">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-game-purple to-game-magenta flex items-center justify-center">
                <Icon name="Mail" size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email поддержка</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ответ в течение 24 часов
              </p>
              <Link to="/contacts">
                <Button variant="outline" size="sm" className="border-game-purple/50">
                  Написать
                </Button>
              </Link>
            </Card>

            <Card className="text-center p-6 hover-scale card-gradient">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-game-purple to-game-magenta flex items-center justify-center">
                <Icon name="Phone" size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Телефон</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Звонок бесплатный по России
              </p>
              <Button variant="outline" size="sm" className="border-game-purple/50">
                +7 (800) 555-35-35
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
