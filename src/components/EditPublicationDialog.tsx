import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Publication } from '@/types/publication';

type EditPublicationDialogProps = {
  publication: Publication | null;
  open: boolean;
  onClose: () => void;
  onSave: (pub: Publication) => void;
};

const EditPublicationDialog = ({ publication, open, onClose, onSave }: EditPublicationDialogProps) => {
  const [title, setTitle] = useState(publication?.title || '');
  const [author, setAuthor] = useState(publication?.author || '');
  const [category, setCategory] = useState(publication?.category || '');

  const handleSave = () => {
    if (publication) {
      onSave({
        ...publication,
        title,
        author,
        category
      });
      onClose();
    }
  };

  if (!publication) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Редактировать публикацию</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Название</Label>
            <Input 
              id="edit-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-author">Автор</Label>
            <Input 
              id="edit-author" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">Категория</Label>
            <Input 
              id="edit-category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPublicationDialog;
