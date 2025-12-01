import { Game } from '@/components/GameCard';

export const gamesData: Game[] = [
  {
    id: 1,
    title: 'Cyber Legends: Neon Warriors',
    developer: 'Neon Studios',
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    image: 'https://cdn.poehali.dev/projects/31eeeeb4-c765-4558-8abf-653db276f611/files/1cb3aef2-b91a-4422-8e15-82546a0276db.jpg',
    rating: 4.8,
    tags: ['Экшн', 'Шутер', 'Киберпанк']
  },
  {
    id: 2,
    title: 'Fantasy Quest: Dragon Age',
    developer: 'Epic Fantasy Games',
    price: 2499,
    image: 'https://cdn.poehali.dev/projects/31eeeeb4-c765-4558-8abf-653db276f611/files/d296009f-7d4f-4a5c-873a-6e87e440b994.jpg',
    rating: 4.9,
    tags: ['RPG', 'Фэнтези', 'Приключения']
  },
  {
    id: 3,
    title: 'Space Odyssey',
    developer: 'Cosmic Interactive',
    price: 1799,
    originalPrice: 2399,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=800&fit=crop',
    rating: 4.7,
    tags: ['Стратегия', 'Космос', 'Симулятор']
  },
  {
    id: 4,
    title: 'Horror Mansion',
    developer: 'Dark Vision',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=800&fit=crop',
    rating: 4.5,
    tags: ['Хоррор', 'Выживание', 'Инди']
  },
  {
    id: 5,
    title: 'Racing Fury',
    developer: 'Speed Demons',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=800&fit=crop',
    rating: 4.6,
    tags: ['Гонки', 'Аркада', 'Мультиплеер']
  },
  {
    id: 6,
    title: 'Medieval Warriors',
    developer: 'Iron Forge',
    price: 2299,
    originalPrice: 2999,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&h=800&fit=crop',
    rating: 4.8,
    tags: ['Экшн', 'Средневековье', 'PvP']
  },
  {
    id: 7,
    title: 'Puzzle Master',
    developer: 'Brain Games',
    price: 899,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&h=800&fit=crop',
    rating: 4.4,
    tags: ['Головоломка', 'Казуал', 'Логика']
  },
  {
    id: 8,
    title: 'Battle Royale Arena',
    developer: 'Titan Games',
    price: 0,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=800&fit=crop',
    rating: 4.7,
    tags: ['Battle Royale', 'Шутер', 'F2P']
  }
];

export const categories = [
  { name: 'Экшн', icon: 'Zap', count: 156 },
  { name: 'RPG', icon: 'Sword', count: 89 },
  { name: 'Стратегия', icon: 'Brain', count: 67 },
  { name: 'Шутер', icon: 'Crosshair', count: 134 },
  { name: 'Приключения', icon: 'Map', count: 98 },
  { name: 'Симулятор', icon: 'Plane', count: 71 }
];
