import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

type HeaderProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  uploadProgress: number;
  isUploading: boolean;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header = ({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery,
  uploadProgress,
  isUploading,
  handleFileUpload
}: HeaderProps) => {
  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-primary">ВСЕ СВОИ ВЫПУСКНЫЕ АЛЬБОМЫ</h1>
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
  );
};

export default Header;
