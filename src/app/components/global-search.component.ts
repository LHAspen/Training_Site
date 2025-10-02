import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService, SearchResult } from '../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container" [class.active]="isOpen">
      <div class="search-input-wrapper">
        <input 
          #searchInput
          type="text" 
          class="search-input" 
          placeholder="Search"
          [(ngModel)]="searchQuery"
          (input)="onSearchInput()"
          (focus)="openSearch()"
          (keydown.escape)="closeSearch()"
        >
        <button class="search-button" (click)="performSearch()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15.514 15.506L21 21ZM17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" stroke-width="2"/>
          </svg>
        </button>
      </div>

      <div class="search-overlay" *ngIf="isOpen" (click)="closeSearch()"></div>
      
      <div class="search-dropdown" *ngIf="isOpen && (searchResults.length > 0 || isSearching)">
        <div class="search-results">
          <div *ngIf="isSearching" class="search-loading">
            <span>Searching...</span>
          </div>

          <div *ngIf="searchResults.length > 0" class="results-list">
            <div class="results-header">
              <h4>Search Results ({{ searchResults.length }})</h4>
            </div>
            
            <div class="result-item" 
                 *ngFor="let result of searchResults" 
                 (click)="selectResult(result)"
                 tabindex="0"
                 (keydown.enter)="selectResult(result)">
              <div class="result-icon">
                <!-- Category Icon (Folder) -->
                <svg *ngIf="result.category === 'Category'" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" stroke="#1c4a4c" stroke-width="2" fill="none"/>
                </svg>
                
                <!-- Content Icon (Document) -->
                <svg *ngIf="result.category === 'Content'" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#009077" stroke-width="2" fill="none"/>
                  <polyline points="14,2 14,8 20,8" stroke="#009077" stroke-width="2" fill="none"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="#009077" stroke-width="2"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="#009077" stroke-width="2"/>
                  <polyline points="10,9 9,9 8,9" stroke="#009077" stroke-width="2"/>
                </svg>
              </div>
              <div class="result-content">
                <div class="result-header">
                  <h5 class="result-title">{{ result.title }}</h5>
                  <span class="result-type" [attr.data-category]="result.category">{{ result.category }}</span>
                </div>
                <p class="result-description">{{ result.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      position: relative;
      width: 350px;
      min-width: 350px;
      max-width: 350px;
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: stretch;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 0;
      width: 100%;
      gap: 0;
    }

    .search-input-wrapper:focus-within {
      border-color: #009077;
      box-shadow: 0 0 0 2px rgba(0, 144, 119, 0.1);
    }

    .search-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 6px 6px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      max-height: 400px;
      overflow-y: auto;
      z-index: 1001;
    }

    .search-header {
      padding: 20px 24px;
      border-bottom: 1px solid #e5e7eb;
    }

    .search-input-container {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 12px 16px;
    }

    .search-icon {
      color: #6b7280;
      padding: 12px;
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      border: none;
      background: none;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      color: #1f2937;
      outline: none;
      padding: 12px 0 12px 16px;
      letter-spacing: 0.3px;
      margin: 0;
    }

    .search-input::placeholder {
      color: #9ca3af;
      font-size: 14px;
      letter-spacing: 0.3px;
      padding-left: 2px;
    }

    .search-button {
      background: #1c4a4c;
      border: none;
      color: white;
      padding: 12px 16px;
      border-radius: 0 5px 5px 0;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 48px;
      margin: 0;
    }

    .search-button:hover {
      background: #0f3335;
    }



    .results-header {
      padding: 12px 16px 8px 16px;
      background: #f8f9fa;
      border-bottom: 1px solid #e5e7eb;
    }

    .results-header h4 {
      margin: 0;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .results-list {
      padding: 0;
      max-height: 300px;
      overflow-y: auto;
    }

    .result-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid #f3f4f6;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .result-item:hover,
    .result-item:focus {
      background: #f8f9fa;
      outline: none;
    }

    .result-item:last-child {
      border-bottom: none;
    }

    .result-icon {
      flex-shrink: 0;
      margin-top: 2px;
    }

    .result-content {
      flex: 1;
      min-width: 0;
    }

    .result-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .result-title {
      margin: 0;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #1f2937;
      flex: 1;
    }

    .result-type {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 8px;
      margin-left: 8px;
      flex-shrink: 0;
    }

    .result-type[data-category="Category"] {
      color: #1c4a4c;
      background: rgba(28, 74, 76, 0.1);
    }

    .result-type[data-category="Content"] {
      color: #009077;
      background: rgba(0, 144, 119, 0.1);
    }

    .result-description {
      margin: 0;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 12px;
      color: #6b7280;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    @media (max-width: 1200px) {
      .search-container {
        width: 320px;
        min-width: 320px;
        max-width: 320px;
      }
    }

    @media (max-width: 768px) {
      .search-container {
        width: 100%;
        min-width: 300px;
        max-width: 100%;
      }
      
      .search-dropdown {
        max-height: 300px;
      }
      
      .result-item {
        padding: 10px 12px;
      }
      
      .results-header {
        padding: 10px 12px 6px 12px;
      }
    }
  `]
})
export class GlobalSearchComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Output() onSearchResult = new EventEmitter<SearchResult>();
  @Output() onClose = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchQuery = '';
  searchResults: SearchResult[] = [];
  isSearching = false;
  
  private subscriptions: Subscription[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    // Subscribe to search service observables
    this.subscriptions.push(
      this.searchService.searchResults$.subscribe(results => {
        this.searchResults = results;
      }),
      this.searchService.isSearching$.subscribe(isSearching => {
        this.isSearching = isSearching;
      }),
      this.searchService.searchQuery$.subscribe(query => {
        this.searchQuery = query;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit() {
    if (this.isOpen && this.searchInput) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 100);
    }
  }

  toggleSearch() {
    if (this.isOpen) {
      this.closeSearch();
    } else {
      this.openSearch();
    }
  }

  openSearch() {
    this.isOpen = true;
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    }, 100);
  }

  closeSearch() {
    this.isOpen = false;
    this.searchService.clearSearch();
    this.onClose.emit();
  }

  onSearchInput() {
    this.searchService.search(this.searchQuery);
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.searchService.search(this.searchQuery);
    }
  }

  searchSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.searchService.search(suggestion);
  }

  selectResult(result: SearchResult) {
    this.onSearchResult.emit(result);
    this.closeSearch();
  }
}