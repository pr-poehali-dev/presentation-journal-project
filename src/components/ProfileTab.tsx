import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Publication } from '@/types/publication';
import EditPublicationDialog from './EditPublicationDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ProfileTabProps = {
  myPublications: Publication[];
  totalViews: number;
  onEditPublication: (pub: Publication) => void;
  onDeletePublication: (id: number) => void;
};

const ProfileTab = ({ myPublications, totalViews, onEditPublication, onDeletePublication }: ProfileTabProps) => {
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleEdit = (pub: Publication) => {
    setEditingPublication(pub);
  };

  const handleSaveEdit = (pub: Publication) => {
    onEditPublication(pub);
    setEditingPublication(null);
  };

  const handleDelete = (id: number) => {
    onDeletePublication(id);
    setDeletingId(null);
  };
  return (
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
                  <Button variant="outline" size="sm" onClick={() => handleEdit(pub)}>
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setDeletingId(pub.id)}>
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <EditPublicationDialog 
        publication={editingPublication}
        open={!!editingPublication}
        onClose={() => setEditingPublication(null)}
        onSave={handleSaveEdit}
      />

      <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить публикацию?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Публикация будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={() => deletingId && handleDelete(deletingId)}>
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileTab;