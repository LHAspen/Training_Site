import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type PageType = 'landing' | 'help-support' | 'bulk-assignment-article';

export interface NavigationCallbacks {
  onNavigateToHome: () => void;
  onNavigateToHelp: () => void;
  onNavigateToBulkAssignment: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentPageSubject = new BehaviorSubject<PageType>('landing');
  currentPage$ = this.currentPageSubject.asObservable();

  private navigationCallbacks: NavigationCallbacks = {
    onNavigateToHome: () => this.navigateToPage('landing'),
    onNavigateToHelp: () => this.navigateToPage('help-support'),
    onNavigateToBulkAssignment: () => this.navigateToPage('bulk-assignment-article')
  };

  getCurrentPage(): PageType {
    return this.currentPageSubject.value;
  }

  navigateToPage(page: PageType): void {
    this.currentPageSubject.next(page);
  }

  getNavigationCallbacks(): NavigationCallbacks {
    return this.navigationCallbacks;
  }

  navigateToHome(): void {
    this.navigateToPage('landing');
  }

  navigateToHelp(): void {
    this.navigateToPage('help-support');
  }

  navigateToBulkAssignment(): void {
    this.navigateToPage('bulk-assignment-article');
  }
}