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
    {
      id: '1',
      title: 'Beef, Lamb & Dairy',
      description: 'Information and resources for beef, lamb and dairy schemes',
      category: 'Category',
      url: '/help-support',
      keywords: ['beef', 'lamb', 'dairy', 'livestock', 'cattle', 'milk']
    },
    {
      id: '2',
      title: 'Pigs',
      description: 'Pig Quality Assurance Scheme (PQAS) information',
      category: 'Category',
      url: '/help-support',
      keywords: ['pigs', 'pqas', 'swine', 'pork', 'quality', 'assurance']
    },
    {
      id: '3',
      title: 'Eggs',
      description: 'Egg production and quality standards',
      category: 'Category',
      url: '/help-support',
      keywords: ['eggs', 'poultry', 'laying', 'hens', 'production']
    },
    {
      id: '4',
      title: 'Processors',
      description: 'Food processing facilities and requirements',
      category: 'Category',
      url: '/help-support',
      keywords: ['processors', 'processing', 'facilities', 'manufacturing', 'food']
    },
    {
      id: '5',
      title: 'Poultry',
      description: 'Poultry farming and production standards',
      category: 'Category',
      url: '/help-support',
      keywords: ['poultry', 'chicken', 'turkey', 'birds', 'farming']
    },
    {
      id: '6',
      title: 'Horticulture',
      description: 'Fruit and vegetable production guidelines',
      category: 'Category',
      url: '/help-support',
      keywords: ['horticulture', 'fruits', 'vegetables', 'crops', 'plants', 'growing']
    },
    {
      id: '7',
      title: 'Member Portal',
      description: 'Access and manage your member account',
      category: 'Category',
      url: '/help-support',
      keywords: ['member', 'portal', 'account', 'login', 'profile', 'access']
    },
    {
      id: '8',
      title: 'FRS HelpDesk',
      description: 'Get support and assistance from our helpdesk team',
      category: 'Category',
      url: '/help-support',
      keywords: ['helpdesk', 'support', 'assistance', 'frs', 'help', 'contact']
    },
    {
      id: '9',
      title: 'Users & Roles',
      description: 'Manage user permissions and role assignments',
      category: 'Category',
      url: '/help-support',
      keywords: ['users', 'roles', 'permissions', 'access', 'management', 'admin']
    },
    {
      id: '10',
      title: 'System Overview',
      description: 'Understanding the Bord Bia system and its features',
      category: 'Category',
      url: '/help-support',
      keywords: ['system', 'overview', 'features', 'platform', 'bord', 'bia']
    },
    {
      id: '11',
      title: 'Bulk Assignment of Auditors',
      description: 'Learn how to assign multiple auditors efficiently',
      category: 'Content',
      url: '/bulk-assignment',
      keywords: ['bulk', 'assignment', 'auditors', 'assign', 'multiple', 'audit']
    },
    {
      id: '12',
      title: 'Pre-Audit Calls',
      description: 'Preparation and procedures for pre-audit communications',
      category: 'Content',
      url: '/help-support',
      keywords: ['pre-audit', 'calls', 'preparation', 'communication', 'before']
    },
    {
      id: '13',
      title: 'Task Assignment',
      description: 'How to assign and manage audit tasks',
      category: 'Content',
      url: '/help-support',
      keywords: ['task', 'assignment', 'manage', 'audit', 'workflow']
    },
    {
      id: '14',
      title: 'Call Logging',
      description: 'Recording and tracking audit-related calls',
      category: 'Content',
      url: '/help-support',
      keywords: ['call', 'logging', 'recording', 'tracking', 'phone', 'communication']
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