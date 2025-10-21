import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

type Publication = {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  views: number;
  pages: number;
  uploadDate: string;
  pageImages?: string[];
};

const mockPublications: Publication[] = [
  { id: 1, title: 'Современная архитектура', author: 'Анна Иванова', cover: 'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/85d83704-7fe6-4aa3-903d-468fbcea79e0.jpg', category: 'Журнал', views: 12453, pages: 48, uploadDate: '2024-10-15', pageImages: [
    'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/ecd4396a-7bb9-4ed0-84c1-47fb8ea2e3f7.jpg',
    'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/ecd4396a-7bb9-4ed0-84c1-47fb8ea2e3f7.jpg',
    'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/ecd4396a-7bb9-4ed0-84c1-47fb8ea2e3f7.jpg'
  ] },
  { id: 2, title: 'Цифровой маркетинг 2024', author: 'Михаил Петров', cover: 'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/6dcf5ab5-b954-41a4-a8dd-59e3b1497031.jpg', category: 'Книга', views: 8932, pages: 156, uploadDate: '2024-10-12', pageImages: [
    'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/2ec1d58c-7e22-42ef-912d-aa29e3d54937.jpg',
    'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/2ec1d58c-7e22-42ef-912d-aa29e3d54937.jpg',
    'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/2ec1d58c-7e22-42ef-912d-aa29e3d54937.jpg'
  ] },
  { id: 3, title: 'Дизайн интерьеров', author: 'Елена Смирнова', cover: 'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/1c38f8f4-7a57-4a50-bebe-a84dca0f1bd2.jpg', category: 'Журнал', views: 15678, pages: 64, uploadDate: '2024-10-18', pageImages: [
    'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/d25e7586-e50c-4ba4-90cc-1077fe18a445.jpg',
    'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/d25e7586-e50c-4ba4-90cc-1077fe18a445.jpg',
    'https://cdn.poehali.dev/projects/a66ab3ef-73fa-4588-b056-cd5f09a4fc14/files/d25e7586-e50c-4ba4-90cc-1077fe18a445.jpg'
  ] },
  { id: 4, title: 'Кулинарные путешествия', author: 'Дмитрий Волков', cover: '/placeholder.svg', category: 'Журнал', views: 9234, pages: 52, uploadDate: '2024-10-10' },
  { id: 5, title: 'Руководство по фотографии', author: 'Ольга Козлова', cover: '/placeholder.svg', category: 'Книга', views: 11567, pages: 200, uploadDate: '2024-10-08' },
  { id: 6, title: 'Технологии будущего', author: 'Сергей Новиков', cover: '/placeholder.svg', category: 'Журнал', views: 13456, pages: 72, uploadDate: '2024-10-20' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const filteredPublications = mockPublications.filter(pub =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsUploading(false), 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const myPublications = mockPublications.slice(0, 3);
  const totalViews = myPublications.reduce((sum, pub) => sum + pub.views, 0);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-primary">Публикатор</h1>
              <div className="hidden md:flex gap-6">
                <Button 
                  variant={activeTab === 'home' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('home')}
                  className="font-medium"
                >
                  <Icon name="Home" size={18} className="mr-2" />
                  Главная
                </Button>
                <Button 
                  variant={activeTab === 'library' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('library')}
                  className="font-medium"
                >
                  <Icon name="Library" size={18} className="mr-2" />
                  Библиотека
                </Button>
                <Button 
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('profile')}
                  className="font-medium"
                >
                  <Icon name="User" size={18} className="mr-2" />
                  Кабинет
                </Button>
                <Button 
                  variant={activeTab === 'stats' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('stats')}
                  className="font-medium"
                >
                  <Icon name="BarChart3" size={18} className="mr-2" />
                  Статистика
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск публикаций..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="font-medium">
                    <Icon name="Upload" size={18} className="mr-2" />
                    Загрузить
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Загрузить публикацию</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <input 
                        type="file" 
                        accept=".pdf,.epub" 
                        className="hidden" 
                        id="file-upload"
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm font-medium">Перетащите файл сюда или нажмите для выбора</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, EPUB до 100 МБ</p>
                      </label>
                    </div>
                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Загрузка...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 text-center">
                <h2 className="text-4xl font-bold mb-4">Делитесь знаниями с миром</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Публикуйте журналы, книги и документы. Отслеживайте статистику. Достигайте аудиторию.
                </p>
                <Button size="lg" className="font-medium">
                  Начать публиковать
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Популярные публикации</h3>
                <Button variant="ghost" onClick={() => setActiveTab('library')}>
                  Смотреть все
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPublications.slice(0, 6).map((pub) => (
                  <Card key={pub.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => { setSelectedPublication(pub); setCurrentPage(0); }}>
                    <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                      <img src={pub.cover} alt={pub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <Badge className="absolute top-3 right-3">{pub.category}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg mb-1 line-clamp-1">{pub.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{pub.author}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          <span>{pub.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="FileText" size={14} />
                          <span>{pub.pages} стр.</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">Библиотека</h2>
              <p className="text-muted-foreground">Все опубликованные материалы</p>
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск по названию или автору..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Icon name="SlidersHorizontal" size={18} className="mr-2" />
                Фильтры
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPublications.map((pub) => (
                <Card key={pub.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => { setSelectedPublication(pub); setCurrentPage(0); }}>
                  <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                    <img src={pub.cover} alt={pub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <Badge className="absolute top-3 right-3">{pub.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-1 line-clamp-1">{pub.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{pub.author}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Eye" size={14} />
                        <span>{pub.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="FileText" size={14} />
                        <span>{pub.pages} стр.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">Личный кабинет</h2>
              <p className="text-muted-foreground">Управление вашими публикациями</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Публикаций</p>
                      <p className="text-3xl font-bold">{myPublications.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="BookOpen" size={24} className="text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Просмотров</p>
                      <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Icon name="Eye" size={24} className="text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Читателей</p>
                      <p className="text-3xl font-bold">1,234</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Icon name="Users" size={24} className="text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Ваши публикации</h3>
                <div className="space-y-4">
                  {myPublications.map((pub) => (
                    <div key={pub.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <img src={pub.cover} alt={pub.title} className="w-16 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{pub.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">Загружено {new Date(pub.uploadDate).toLocaleDateString('ru-RU')}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="Eye" size={14} />
                            <span>{pub.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="FileText" size={14} />
                            <span>{pub.pages} стр.</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={16} className="mr-2" />
                          Редактировать
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">Статистика просмотров</h2>
              <p className="text-muted-foreground">Аналитика ваших публикаций</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Всего просмотров</p>
                  <p className="text-3xl font-bold mb-1">{totalViews.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} />
                    +12% за неделю
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Среднее время чтения</p>
                  <p className="text-3xl font-bold mb-1">8 мин</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} />
                    +5% за неделю
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Уникальных читателей</p>
                  <p className="text-3xl font-bold mb-1">1,234</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} />
                    +18% за неделю
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Завершённых просмотров</p>
                  <p className="text-3xl font-bold mb-1">67%</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} />
                    +3% за неделю
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Просмотры по дням</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[65, 72, 58, 83, 91, 78, 95].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-primary rounded-t hover:bg-primary/80 transition-colors cursor-pointer"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Популярные публикации</h3>
                <div className="space-y-4">
                  {myPublications
                    .sort((a, b) => b.views - a.views)
                    .map((pub, index) => (
                      <div key={pub.id} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                          {index + 1}
                        </div>
                        <img src={pub.cover} alt={pub.title} className="w-12 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{pub.title}</h4>
                          <p className="text-sm text-muted-foreground">{pub.author}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{pub.views.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">просмотров</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {selectedPublication && selectedPublication.pageImages && (
        <Dialog open={!!selectedPublication} onOpenChange={(open) => !open && setSelectedPublication(null)}>
          <DialogContent className="max-w-6xl h-[90vh] p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div>
                  <h3 className="font-semibold text-lg">{selectedPublication.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedPublication.author}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    Страница {currentPage + 1} из {selectedPublication.pageImages.length}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedPublication(null)}>
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>

              <div className="flex-1 relative bg-muted/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={selectedPublication.pageImages[currentPage]} 
                    alt={`Страница ${currentPage + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                >
                  <Icon name="ChevronLeft" size={24} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => setCurrentPage(prev => Math.min(selectedPublication.pageImages!.length - 1, prev + 1))}
                  disabled={currentPage === selectedPublication.pageImages.length - 1}
                >
                  <Icon name="ChevronRight" size={24} />
                </Button>
              </div>

              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="ZoomIn" size={16} className="mr-2" />
                      Увеличить
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Bookmark" size={16} className="mr-2" />
                      Закладка
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Share2" size={16} className="mr-2" />
                      Поделиться
                    </Button>
                  </div>
                  
                  <div className="flex gap-1">
                    {selectedPublication.pageImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentPage 
                            ? 'w-8 bg-primary' 
                            : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm">
                      <Icon name="BookOpen" size={16} className="mr-2" />
                      Режим чтения
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;