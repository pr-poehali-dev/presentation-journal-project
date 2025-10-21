import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import PublicationCard from './PublicationCard';
import { Publication } from '@/types/publication';

type LibraryTabProps = {
  publications: Publication[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPublicationClick: (pub: Publication) => void;
};

const LibraryTab = ({ publications, searchQuery, setSearchQuery, onPublicationClick }: LibraryTabProps) => {
  return (
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
        {publications.map((pub) => (
          <PublicationCard 
            key={pub.id} 
            publication={pub} 
            onClick={() => onPublicationClick(pub)} 
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryTab;
