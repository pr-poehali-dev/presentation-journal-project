import { useState } from 'react';
import Header from '@/components/Header';
import HomeTab from '@/components/HomeTab';
import LibraryTab from '@/components/LibraryTab';
import ProfileTab from '@/components/ProfileTab';
import StatsTab from '@/components/StatsTab';
import Reader from '@/components/Reader';
import { mockPublications } from '@/data/mockPublications';
import { Publication } from '@/types/publication';

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

  const handlePublicationClick = (pub: Publication) => {
    setSelectedPublication(pub);
    setCurrentPage(0);
  };

  const myPublications = mockPublications.slice(0, 3);
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
            publications={mockPublications}
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
