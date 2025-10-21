import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import PublicationCard from './PublicationCard';
import { Publication } from '@/types/publication';

type HomeTabProps = {
  publications: Publication[];
  onPublicationClick: (pub: Publication) => void;
  onViewAllClick: () => void;
};

const HomeTab = ({ publications, onPublicationClick, onViewAllClick }: HomeTabProps) => {
  return (
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
          <Button variant="ghost" onClick={onViewAllClick}>
            Смотреть все
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.slice(0, 6).map((pub) => (
            <PublicationCard 
              key={pub.id} 
              publication={pub} 
              onClick={() => onPublicationClick(pub)} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeTab;
