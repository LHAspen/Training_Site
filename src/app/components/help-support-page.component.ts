import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalSearchComponent } from './global-search.component';
import { SearchResult } from '../services/search.service';

@Component({
  selector: 'app-help-support-page',
  standalone: true,
  imports: [CommonModule, FormsModule, GlobalSearchComponent],
  styles: [`
    .help-page {
      width: 100%;
      min-height: 100vh;
      background: #f8f9fa;
    }

    .header-section {
      background: white;
      border-bottom: 1px solid #e0e0e0;
      padding: 16px 0;
    }

    .header-container {
      max-width: 1920px;
      margin: 0 auto;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-section {
      display: flex;
      align-items: center;
    }

    .bord-bia-logo {
      height: 40px;
      width: auto;
    }

    /* Breadcrumb Styles */
    .breadcrumb-nav {
      background: white;
      padding: 12px 40px;
      border-bottom: 1px solid #e0e0e0;
    }
    .breadcrumb-container {
      max-width: 1920px;
      margin: 0 auto;
    }
    .breadcrumb-list {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 14px;
      margin: 0;
      padding: 0;
      list-style: none;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
    }
    .breadcrumb-item {
      display: flex;
      align-items: center;
    }
    .breadcrumb-button {
      color: #666;
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: none;
      padding: 0;
      font-size: inherit;
      font-family: inherit;
      transition: color 0.2s ease;
    }
    .breadcrumb-button:hover {
      color: #009077;
      text-decoration: none;
    }
    .breadcrumb-current {
      color: #1c4a4c;
      font-weight: 500;
    }
    .breadcrumb-separator {
      color: #666;
      margin: 0 4px;
    }    .header-actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .search-button-header {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: none;
      cursor: pointer;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #1c4a4c;
    }

    .logout-button {
      background: none;
      border: none;
      cursor: pointer;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #1c4a4c;
    }

    .hero-section {
      background: linear-gradient(135deg, #1c4a4c 0%, #004b4e 50%, #009077 100%);
      padding: 60px 40px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1920px;
      margin: 0 auto;
      min-height: 400px;
    }

    .hero-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .hero-text {
      flex: 1;
      max-width: 600px;
    }

    .hero-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 48px;
      font-weight: bold;
      color: white;
      margin: 0 0 16px 0;
      line-height: 1.1;
    }

    .hero-subtitle {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      line-height: 1.4;
    }

    .hero-image {
      margin-left: 40px;
    }



    .content-section {
      padding: 60px 40px;
      max-width: 1600px;
      margin: 0 auto;
    }

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
    }

    .content-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 28px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 0;
    }

    .search-results-count {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      color: #666;
      margin: 8px 0 0 0;
    }

    .content-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      justify-content: flex-start;
    }

    .content-card {
      width: calc(20% - 19.2px);
      min-width: 260px;
      max-width: 320px;
      height: 372px;
      background: white;
      border: 2px solid #f2f2f2;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      flex-grow: 0;
      flex-shrink: 0;
    }

    .content-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }

    .card-image {
      width: 100%;
      height: 192px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .card-image-1 {
      /* Image handled by global CSS class */
    }

    .card-image-2 {
      /* Image handled by global CSS class */
    }

    .card-image-3 {
      /* Image handled by global CSS class */
    }

    .card-image-4 {
      /* Image handled by global CSS class */
    }

    .card-image-5 {
      /* Image handled by global CSS class */
    }

    .card-content {
      padding: 16px;
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 20px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }

    .card-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 16px;
      color: #cd546d;
    }

    .meta-icon {
      width: 16px;
      height: 16px;
      fill: #cd546d;
    }

    .card-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .learn-more {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 20px;
      color: #1c4a4c;
      margin: 0;
    }

    .chevron-icon {
      width: 20px;
      height: 20px;
      fill: #1c4a4c;
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      text-align: center;
      max-width: 480px;
      width: 90%;
      margin: 20px;
    }

    .modal-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 24px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 0 0 16px 0;
    }

    .modal-message {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 16px;
      color: #666;
      margin: 0 0 32px 0;
      line-height: 1.5;
    }

    .modal-button {
      background: #009077;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .modal-button:hover {
      background: #007a66;
    }

    .search-workshops {
      background: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      width: 400px;
    }

    .search-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      width: 100%;
      height: 40px;
      padding: 8px 50px 8px 16px;
      border: 1px solid #d3d2d2;
      border-radius: 4px;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 16px;
      color: #7b7676;
      background: white;
    }

    .search-input::placeholder {
      color: #7b7676;
    }

    .search-button {
      position: absolute;
      right: 0;
      width: 40px;
      height: 40px;
      background: #1c4a4c;
      border: none;
      border-radius: 0 4px 4px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .search-button-icon {
      width: 16px;
      height: 16px;
      fill: white;
    }

    @media (max-width: 1400px) {
      .content-card {
        width: calc(25% - 18px);
        min-width: 240px;
        max-width: 300px;
      }
    }

    @media (max-width: 1200px) {
      .hero-section, .content-section {
        padding-left: 20px;
        padding-right: 20px;
      }

      .hero-title {
        font-size: 48px;
      }

      .hero-subtitle {
        font-size: 20px;
      }

      .content-card {
        width: calc(33.333% - 16px);
        min-width: 280px;
        max-width: 350px;
      }
    }

    @media (max-width: 900px) {
      .content-card {
        width: calc(50% - 12px);
        min-width: 300px;
        max-width: 400px;
      }
    }

    @media (max-width: 768px) {
      .header-container {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }

      .logo-section {
        justify-content: center;
      }

      .header-actions {
        width: 100%;
        justify-content: center;
      }

    .no-results {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      padding: 60px 20px;
      margin-top: 40px;
    }

    .no-results-content {
      text-align: center;
      color: #6b7280;
      max-width: 500px;
      width: 100%;
    }

    .no-results-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto 24px auto;
      display: block;
      opacity: 0.6;
    }

    .no-results h3 {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 20px;
      color: #1f2937;
      margin: 0 0 12px 0;
      text-align: center;
    }

    .no-results p {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 16px;
      margin: 0;
      text-align: center;
      line-height: 1.5;
    }

      .hero-section {
        flex-direction: column;
        gap: 32px;
        text-align: center;
        padding: 40px 20px;
      }

      .hero-image {
        margin-left: 0;
        max-width: 100%;
      }

      .hero-title {
        font-size: 28px;
      }

      .hero-subtitle {
        font-size: 16px;
      }

      .content-cards {
        flex-direction: column;
        gap: 24px;
        width: 100%;
      }

      .content-card {
        width: 100%;
        max-width: none;
        min-width: auto;
      }

      .search-workshops {
        width: 100%;
        max-width: none;
      }
    }

  `],
  template: `
    <div class="help-page">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-container">
          <div class="logo-section">
            <img src="./bord-bia-logo-green.svg" alt="Bord Bia - Irish Food Board" class="bord-bia-logo" (click)="navigateToHome()" style="cursor: pointer;">
          </div>
          <div class="header-actions">
            <app-global-search (onSearchResult)="handleSearchResult($event)"></app-global-search>
            <button class="logout-button">Logout</button>
          </div>
        </div>
      </div>

      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb-nav">
        <div class="breadcrumb-container">
          <ol class="breadcrumb-list">
            <li class="breadcrumb-item">
              <button class="breadcrumb-button" (click)="navigateToHome()">
                Home
              </button>
            </li>
            <li class="breadcrumb-item">
              <span class="breadcrumb-separator">></span>
            </li>
            <li class="breadcrumb-item">
                            <span class="breadcrumb-current">FRS HelpDesk</span>
            </li>
          </ol>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">FRS HelpDesk</h1>
            <p class="hero-subtitle">
              Essential resources and contact information to facilitate effective collaboration and 
              assistance throughout the audit process
            </p>
          </div>
          <div class="hero-image hero-frs-helpdesk">
            <img src="assets/Help_hero.jpg" alt="FRS HelpDesk" />
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="content-section">
        <div class="content-header">
          <div>
            <h2 class="content-title">All FRS HelpDesk Content</h2>
            <p *ngIf="searchQuery.trim() && filteredCards.length > 0" class="search-results-count">
              Found {{ filteredCards.length }} result{{ filteredCards.length === 1 ? '' : 's' }} for "{{ searchQuery }}"
            </p>
          </div>
          <div class="search-workshops">
            <div class="search-container">
              <input 
                type="text" 
                placeholder="Search Content" 
                class="search-input"
                [(ngModel)]="searchQuery"
                (input)="onSearchInput()"
                (keyup.enter)="performSearch()">
              <button class="search-button" (click)="searchQuery.trim() ? performSearch() : clearSearch()" 
                      [title]="searchQuery.trim() ? 'Search' : 'Clear search'">
                <svg *ngIf="!searchQuery.trim()" class="search-button-icon" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <svg *ngIf="searchQuery.trim()" class="search-button-icon" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Content Cards -->
        <div *ngIf="filteredCards.length > 0" class="content-cards">
          <div *ngFor="let card of filteredCards" 
               class="content-card" 
               (click)="handleCardClick(card)">
            <div class="card-image" [ngClass]="card.imageClass"></div>
            <div class="card-content">
              <h3 class="card-title">{{ card.title }}</h3>
              <div class="card-meta">
                <div class="meta-item">
                  <svg class="meta-icon" viewBox="0 0 24 24">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                    <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
                  </svg>
                  <span>{{ card.minutes }}</span>
                </div>
                <div class="meta-item">
                  <svg class="meta-icon" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                  <span>{{ card.date }}</span>
                </div>
              </div>
              <div class="card-action">
                <p class="learn-more">Learn More</p>
                <svg class="chevron-icon" viewBox="0 0 24 24">
                  <path d="m8.59 16.58 4.58-4.59-4.58-4.59L10 6l6 6-6 6-1.41-1.42z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- No results message -->
        <div *ngIf="filteredCards.length === 0 && searchQuery.trim()" class="no-results">
          <div class="no-results-content">
            <svg class="no-results-icon" width="48" height="48" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="#ccc" stroke-width="2" fill="none"/>
              <path d="M15 9L9 15M9 9L15 15" stroke="#ccc" stroke-width="2"/>
            </svg>
            <h3>No content found</h3>
            <p>Try adjusting your search terms or browse all available content.</p>
          </div>
        </div>
      </div>

      <!-- Access Restriction Modal -->
      <div *ngIf="showModal" class="modal-overlay" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3 class="modal-title">Access Restricted</h3>
          <p class="modal-message">
            You do not have access to this content at this time, please contact your admin.
          </p>
          <button class="modal-button" (click)="closeModal()">
            OK
          </button>
        </div>
      </div>
    </div>
  `
})
export class HelpSupportPageComponent implements OnDestroy {
  searchQuery = '';
  showModal = false;
  private searchTimeout: any;

  constructor(private router: Router) {}

  ngOnDestroy() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
  
  contentCards = [
    {
      id: 'bulk-assignment',
      title: 'Bulk Assignment of Auditors',
      minutes: '9 Minutes',
      date: '23/09/25',
      imageClass: 'card-image-5 help-card-image-5',
      keywords: ['bulk', 'assignment', 'auditors', 'assign', 'multiple', 'audit'],
      clickHandler: () => this.router.navigate(['/bulk-assignment'])
    },
    {
      id: 'pre-audit-calls',
      title: 'Pre-Audit Calls',
      minutes: '5 Minutes',
      date: '21/09/25',
      imageClass: 'card-image-1 help-card-image-1',
      keywords: ['pre-audit', 'calls', 'preparation', 'communication', 'before'],
      clickHandler: () => this.showAccessModal()
    },
    {
      id: 'task-assignment',
      title: 'Task Assignment',
      minutes: '8 Minutes',
      date: '19/09/25',
      imageClass: 'card-image-2 help-card-image-2',
      keywords: ['task', 'assignment', 'manage', 'audit', 'workflow'],
      clickHandler: () => this.showAccessModal()
    },
    {
      id: 'call-logging',
      title: 'Call Logging',
      minutes: '7 Minutes',
      date: '15/09/25',
      imageClass: 'card-image-3 help-card-image-3',
      keywords: ['call', 'logging', 'recording', 'tracking', 'phone', 'communication'],
      clickHandler: () => this.showAccessModal()
    },
    {
      id: 'help-desk-history',
      title: 'Help Desk History',
      minutes: '9 Minutes',
      date: '14/09/25',
      imageClass: 'card-image-4 help-card-image-4',
      keywords: ['help', 'desk', 'history', 'past', 'records'],
      clickHandler: () => this.showAccessModal()
    }
  ];

  get filteredCards() {
    if (!this.searchQuery || !this.searchQuery.trim()) {
      return this.contentCards;
    }
    
    const query = this.searchQuery.toLowerCase().trim();
    return this.contentCards.filter(card => {
      // Search in title
      if (card.title.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in keywords
      if (card.keywords.some(keyword => keyword.toLowerCase().includes(query))) {
        return true;
      }
      
      // Search in meta information (minutes and date)
      if (card.minutes.toLowerCase().includes(query) || 
          card.date.toLowerCase().includes(query)) {
        return true;
      }
      
      return false;
    });
  }

  handleCardClick(card: any) {
    if (card.clickHandler) {
      card.clickHandler();
    }
  }

  handleSearchResult(result: SearchResult) {
    // Handle navigation based on search result
    if (result.url === '/bulk-assignment') {
      this.router.navigate(['/bulk-assignment']);
    } else if (result.url === '/help-support') {
      // Stay on current page or refresh content
      console.log('Search result for FRS HelpDesk:', result.title);
    } else if (result.url === '/restricted' || result.url === '/restricted-frs') {
      // Show access modal for restricted content
      this.showAccessModal();
    }
    // Add more navigation cases as needed
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  showAccessModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSearchInput() {
    // Debounce search for better performance
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    this.searchTimeout = setTimeout(() => {
      // The filteredCards getter automatically handles the filtering
      // This timeout ensures we don't filter too frequently while typing
    }, 300);
  }

  performSearch() {
    // Trigger search - the filteredCards getter handles the actual filtering
    // This method can be used for analytics or additional search logic
    console.log('Searching for:', this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = '';
  }
}