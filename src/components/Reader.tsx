import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Publication } from '@/types/publication';

type ReaderProps = {
  publication: Publication | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onClose: () => void;
};

const Reader = ({ publication, currentPage, setCurrentPage, onClose }: ReaderProps) => {
  if (!publication || !publication.pageImages) return null;

  return (
    <Dialog open={!!publication} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h3 className="font-semibold text-lg">{publication.title}</h3>
              <p className="text-sm text-muted-foreground">{publication.author}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Страница {currentPage + 1} из {publication.pageImages.length}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          <div className="flex-1 relative bg-muted/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={publication.pageImages[currentPage]} 
                alt={`Страница ${currentPage + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
            >
              <Icon name="ChevronLeft" size={24} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={() => setCurrentPage(Math.min(publication.pageImages!.length - 1, currentPage + 1))}
              disabled={currentPage === publication.pageImages.length - 1}
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
                {publication.pageImages.map((_, index) => (
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
  );
};

export default Reader;
