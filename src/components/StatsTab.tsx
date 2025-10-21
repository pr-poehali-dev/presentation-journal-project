import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Publication } from '@/types/publication';

type StatsTabProps = {
  myPublications: Publication[];
  totalViews: number;
};

const StatsTab = ({ myPublications, totalViews }: StatsTabProps) => {
  return (
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
  );
};

export default StatsTab;
