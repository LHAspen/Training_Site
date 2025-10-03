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
    // Accessible content
    {
      id: '1',
      title: 'FRS HelpDesk',
      description: 'Get support and assistance from our helpdesk team',
      category: 'Content',
      url: '/help-support',
      keywords: ['frs', 'helpdesk', 'support', 'assistance', 'help', 'contact', 'desk']
    },
    {
      id: '2',
      title: 'Bulk Assignment of Auditors',
      description: 'Learn how to assign multiple auditors efficiently',
      category: 'Content',
      url: '/bulk-assignment',
      keywords: ['bulk', 'assignment', 'auditors', 'assign', 'multiple', 'audit']
    },
    // Restricted categories (landing page cards)
    {
      id: '3',
      title: 'System Overview',
      description: 'Understanding the Bord Bia system and its features',
      category: 'Category',
      url: 'restricted',
      keywords: ['system', 'overview', 'features', 'platform', 'bord', 'bia']
    },
    {
      id: '4',
      title: 'Users & Roles',
      description: 'Manage user permissions and role assignments',
      category: 'Category',
      url: 'restricted',
      keywords: ['users', 'roles', 'permissions', 'access', 'management', 'admin']
    },
    {
      id: '5',
      title: 'Assignments & Review',
      description: 'Audit assignments and review processes',
      category: 'Category',
      url: 'restricted',
      keywords: ['assignments', 'review', 'audit', 'process', 'workflow']
    },
    {
      id: '6',
      title: 'Pig Scheme',
      description: 'Pig Quality Assurance Scheme (PQAS) information',
      category: 'Category',
      url: 'restricted',
      keywords: ['pig', 'scheme', 'pqas', 'swine', 'pork', 'quality', 'assurance']
    },
    {
      id: '7',
      title: 'Member Portal',
      description: 'Access and manage your member account',
      category: 'Category',
      url: 'restricted',
      keywords: ['member', 'portal', 'account', 'login', 'profile', 'access']
    },
    // Restricted articles (FSR page cards)
    {
      id: '8',
      title: 'Pre-Audit Calls',
      description: 'Preparation and procedures for pre-audit communications',
      category: 'Content',
      url: 'restricted-fsr',
      keywords: ['pre-audit', 'calls', 'preparation', 'communication', 'before']
    },
    {
      id: '9',
      title: 'Task Assignment',
      description: 'How to assign and manage audit tasks',
      category: 'Content',
      url: 'restricted-fsr',
      keywords: ['task', 'assignment', 'manage', 'audit', 'workflow']
    },
    {
      id: '10',
      title: 'Call Logging',
      description: 'Recording and tracking audit-related calls',
      category: 'Content',
      url: 'restricted-fsr',
      keywords: ['call', 'logging', 'recording', 'tracking', 'phone', 'communication']
    },
    {
      id: '11',
      title: 'Help Desk History',
      description: 'Historical records and past support interactions',
      category: 'Content',
      url: 'restricted-fsr',
      keywords: ['help', 'desk', 'history', 'past', 'records', 'support']
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