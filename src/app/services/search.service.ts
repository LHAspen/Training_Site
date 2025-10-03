import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  keywords: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResults: SearchResult[] = [
    // FRS HelpDesk Category - Accessible
    {
      id: '1',
      title: 'FRS HelpDesk',
      description: 'Essential resources and contact information for audit process assistance',
      category: 'Category',
      url: '/help-support',
      keywords: ['frs', 'helpdesk', 'support', 'assistance', 'help', 'contact', 'desk', 'audit', 'resources']
    },
    
    // FRS HelpDesk Content - Accessible
    {
      id: '2',
      title: 'Bulk Assignment of Auditors',
      description: 'Learn how to assign multiple auditors efficiently (9 minutes)',
      category: 'Content',
      url: '/bulk-assignment',
      keywords: ['bulk', 'assignment', 'auditors', 'assign', 'multiple', 'audit', 'frs', 'helpdesk']
    },
    
    // FRS HelpDesk Content - Restricted
    {
      id: '3',
      title: 'Pre-Audit Calls',
      description: 'Preparation and procedures for pre-audit communications (5 minutes)',
      category: 'Content',
      url: '/restricted-frs',
      keywords: ['pre-audit', 'calls', 'preparation', 'communication', 'before', 'frs', 'helpdesk']
    },
    {
      id: '4',
      title: 'Task Assignment',
      description: 'How to assign and manage audit tasks (8 minutes)',
      category: 'Content',
      url: '/restricted-frs',
      keywords: ['task', 'assignment', 'manage', 'audit', 'workflow', 'frs', 'helpdesk']
    },
    {
      id: '5',
      title: 'Call Logging',
      description: 'Recording and tracking audit-related calls (7 minutes)',
      category: 'Content',
      url: '/restricted-frs',
      keywords: ['call', 'logging', 'recording', 'tracking', 'phone', 'communication', 'frs', 'helpdesk']
    },
    {
      id: '6',
      title: 'Help Desk History',
      description: 'Historical records and past help desk interactions (9 minutes)',
      category: 'Content',
      url: '/restricted-frs',
      keywords: ['help', 'desk', 'history', 'past', 'records', 'interactions', 'frs', 'helpdesk']
    },

    // Other Categories - Restricted
    {
      id: '7',
      title: 'System Overview',
      description: 'Understanding the Bord Bia system and its features',
      category: 'Category',
      url: '/restricted',
      keywords: ['system', 'overview', 'features', 'platform', 'bord', 'bia']
    },
    {
      id: '8',
      title: 'Users & Roles',
      description: 'Manage user permissions and role assignments',
      category: 'Category',
      url: '/restricted',
      keywords: ['users', 'roles', 'permissions', 'access', 'management', 'admin']
    },
    {
      id: '9',
      title: 'Assignments & Review',
      description: 'Manage assignments and review processes',
      category: 'Category',
      url: '/restricted',
      keywords: ['assignments', 'review', 'manage', 'process', 'workflow']
    },
    {
      id: '10',
      title: 'Pig Scheme',
      description: 'Pig Quality Assurance Scheme (PQAS) information',
      category: 'Category',
      url: '/restricted',
      keywords: ['pig', 'scheme', 'pqas', 'swine', 'pork', 'quality', 'assurance']
    },
    {
      id: '11',
      title: 'Member Portal',
      description: 'Access and manage your member account',
      category: 'Category',
      url: '/restricted',
      keywords: ['member', 'portal', 'account', 'login', 'profile', 'access']
    }
  ];

  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  private searchResultsSubject = new BehaviorSubject<SearchResult[]>([]);
  public searchResults$ = this.searchResultsSubject.asObservable();

  private isSearchingSubject = new BehaviorSubject<boolean>(false);
  public isSearching$ = this.isSearchingSubject.asObservable();

  search(query: string): void {
    this.searchQuerySubject.next(query);
    
    if (!query.trim()) {
      this.searchResultsSubject.next([]);
      this.isSearchingSubject.next(false);
      return;
    }

    this.isSearchingSubject.next(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const results = this.performSearch(query);
      this.searchResultsSubject.next(results);
      this.isSearchingSubject.next(false);
    }, 300);
  }

  private performSearch(query: string): SearchResult[] {
    const searchTerm = query.toLowerCase().trim();
    
    return this.searchResults.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    ).sort((a, b) => {
      // Prioritize title matches over description matches
      const aTitle = a.title.toLowerCase().includes(searchTerm);
      const bTitle = b.title.toLowerCase().includes(searchTerm);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      
      return 0;
    });
  }

  clearSearch(): void {
    this.searchQuerySubject.next('');
    this.searchResultsSubject.next([]);
    this.isSearchingSubject.next(false);
  }

  getSearchQuery(): string {
    return this.searchQuerySubject.value;
  }
}