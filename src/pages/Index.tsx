import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import HomeTab from '@/components/HomeTab';
import LibraryTab from '@/components/LibraryTab';
import ProfileTab from '@/components/ProfileTab';
import StatsTab from '@/components/StatsTab';
import Reader from '@/components/Reader';
import { mockPublications } from '@/data/mockPublications';
import { Publication } from '@/types/publication';

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [publications, setPublications] = useState<Publication[]>(mockPublications);

  const filteredPublications = publications.filter(pub =>
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
            setTimeout(() => {
              setIsUploading(false);
              toast({
                title: 'Успешно загружено!',
                description: `Файл "${file.name}" был успешно загружен.`,
              });
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleEditPublication = (updatedPub: Publication) => {
    setPublications(publications.map(pub => 
      pub.id === updatedPub.id ? updatedPub : pub
    ));
    toast({
      title: 'Изменения сохранены',
      description: `Публикация "${updatedPub.title}" обновлена.`,
    });
  };

  const handleDeletePublication = (id: number) => {
    const pubToDelete = publications.find(p => p.id === id);
    setPublications(publications.filter(pub => pub.id !== id));
    toast({
      title: 'Публикация удалена',
      description: pubToDelete ? `"${pubToDelete.title}" была удалена.` : 'Публикация удалена.',
      variant: 'destructive',
    });
  };

  const handlePublicationClick = (pub: Publication) => {
    setSelectedPublication(pub);
    setCurrentPage(0);
  };

  const myPublications = publications.slice(0, 3);
  const totalViews = myPublications.reduce((sum, pub) => sum + pub.views, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        uploadProgress={uploadProgress}
        isUploading={isUploading}
        handleFileUpload={handleFileUpload}
      />

      <main className="container mx-auto px-6 py-12">
        {activeTab === 'home' && (
          <HomeTab 
            publications={publications}
            onPublicationClick={handlePublicationClick}
            onViewAllClick={() => setActiveTab('library')}
          />
        )}

        {activeTab === 'library' && (
          <LibraryTab 
            publications={filteredPublications}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onPublicationClick={handlePublicationClick}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab 
            myPublications={myPublications}
            totalViews={totalViews}
            onEditPublication={handleEditPublication}
            onDeletePublication={handleDeletePublication}
          />
        )}

        {activeTab === 'stats' && (
          <StatsTab 
            myPublications={myPublications}
            totalViews={totalViews}
          />
        )}
      </main>

      <Reader 
        publication={selectedPublication}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onClose={() => setSelectedPublication(null)}
      />
    </div>
  );
};

export default Index;