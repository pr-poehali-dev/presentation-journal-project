import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Publication } from '@/types/publication';

type PublicationCardProps = {
  publication: Publication;
  onClick: () => void;
};

const PublicationCard = ({ publication, onClick }: PublicationCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={onClick}>
      <div className="aspect-[3/4] bg-muted relative overflow-hidden">
        <img src={publication.cover} alt={publication.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <Badge className="absolute top-3 right-3">{publication.category}</Badge>
      </div>
      <CardContent className="p-4">
        <h4 className="font-semibold text-lg mb-1 line-clamp-1">{publication.title}</h4>
        <p className="text-sm text-muted-foreground mb-3">{publication.author}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={14} />
            <span>{publication.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="FileText" size={14} />
            <span>{publication.pages} стр.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicationCard;
