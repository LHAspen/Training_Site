import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { HelpDeskSupportPage } from "./components/HelpDeskSupportPage";
import { BulkAssignmentArticlePage } from "./components/BulkAssignmentArticlePage";
import { Footer } from "./components/Footer";
import { Breadcrumb } from "./components/Breadcrumb";
import { SearchProvider, useSearch } from "./components/SearchContext";

type PageType = 'landing' | 'help-support' | 'bulk-assignment-article';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const { setNavigationCallbacks } = useSearch();

  const handleNavigateToHelp = () => {
    setCurrentPage('help-support');
  };

  const handleNavigateToHome = () => {
    setCurrentPage('landing');
  };

  const handleNavigateToBulkAssignment = () => {
    setCurrentPage('bulk-assignment-article');
  };

  // Set up navigation callbacks for search
  useEffect(() => {
    setNavigationCallbacks({
      onNavigateToHome: handleNavigateToHome,
      onNavigateToHelp: handleNavigateToHelp,
      onNavigateToBulkAssignment: handleNavigateToBulkAssignment,
    });
  }, [setNavigationCallbacks]);

  return (
    <>
      {currentPage === 'landing' && (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            <LandingPage onNavigateToHelp={handleNavigateToHelp} />
          </div>
          <Footer />
        </div>
      )}

      {currentPage === 'bulk-assignment-article' && (
        <div className="min-h-screen flex flex-col">
          <Breadcrumb items={[
            { label: "Home", onClick: handleNavigateToHome },
            { label: "Help Desk & Support", onClick: handleNavigateToHelp },
            { label: "Bulk Assignment of Auditors", current: true }
          ]} />
          <div className="flex-1">
            <BulkAssignmentArticlePage />
          </div>
          <Footer />
        </div>
      )}

      {currentPage === 'help-support' && (
        <div className="min-h-screen flex flex-col">
          <Breadcrumb items={[
            { label: "Home", onClick: handleNavigateToHome },
            { label: "Help Desk & Support", current: true }
          ]} />
          <div className="flex-1">
            <HelpDeskSupportPage 
              onNavigateToBulkAssignment={handleNavigateToBulkAssignment}
              onNavigateToHome={handleNavigateToHome}
              onNavigateToHelp={handleNavigateToHelp}
            />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <SearchProvider>
      <AppContent />
    </SearchProvider>
  );
}