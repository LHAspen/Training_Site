import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
      gap: 24px;
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
      background: #004b4e;
      position: relative;
      max-width: 1920px;
      margin: 0 auto;
      overflow: hidden;
    }

    .hero-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 400px;
    }

    .hero-text {
      padding: 60px 40px;
      flex: 1;
      max-width: 600px;
    }

    .hero-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 60px;
      font-weight: bold;
      color: white;
      margin: 0 0 24px 0;
      line-height: 1;
    }

    .hero-subtitle {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 24px;
      color: white;
      margin: 0;
      line-height: 1.2;
    }

    .hero-image {
      flex: 1;
      height: 400px;
      background: linear-gradient(135deg, rgba(0,144,119,0.3) 0%, rgba(28,74,76,0.3) 100%),
                  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><rect fill="%23005a5c" width="800" height="400"/><circle cx="600" cy="150" r="100" fill="%23007b7e" opacity="0.7"/><circle cx="700" cy="250" r="80" fill="%23009077" opacity="0.5"/><rect x="500" y="100" width="200" height="200" rx="20" fill="%23ffffff" opacity="0.1"/></svg>')
                  right center/cover;
    }



    .content-section {
      padding: 60px 40px;
      max-width: 1920px;
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

    .content-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      justify-content: flex-start;
    }

    .content-card {
      width: 320px;
      height: 372px;
      background: white;
      border: 2px solid #f2f2f2;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
      background: linear-gradient(135deg, #e8f5f3 0%, #f0f9f8 100%),
                  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 192"><rect fill="%23f8fffe" width="256" height="192"/><rect x="40" y="40" width="176" height="112" rx="8" fill="%23ffffff" stroke="%23e0e0e0" stroke-width="2"/><circle cx="80" cy="80" r="20" fill="%23009077"/><path d="M70 75h20m-10-5v10" stroke="%23ffffff" stroke-width="2" stroke-linecap="round"/><rect x="110" y="65" width="80" height="6" fill="%23004b4e" rx="3"/><rect x="110" y="80" width="60" height="4" fill="%23cccccc" rx="2"/><rect x="110" y="90" width="70" height="4" fill="%23cccccc" rx="2"/><circle cx="200" cy="60" r="12" fill="%23cd546d"/><path d="M195 55l10 10m0-10l-10 10" stroke="%23ffffff" stroke-width="2" stroke-linecap="round"/><rect x="60" y="120" width="136" height="20" fill="%23f8f9fa" stroke="%23e0e0e0" rx="4"/><circle cx="75" cy="130" r="4" fill="%23009077"/><rect x="85" y="127" width="40" height="3" fill="%23004b4e"/><rect x="85" y="133" width="30" height="2" fill="%23cccccc"/></svg>')
                  center/contain;
    }

    .card-image-2 {
      background: linear-gradient(135deg, #f3f0e8 0%, #f8f5f0 100%),
                  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 192"><rect fill="%23fefdf8" width="256" height="192"/><rect x="30" y="30" width="196" height="132" rx="8" fill="%23ffffff" stroke="%23e0e0e0" stroke-width="2"/><rect x="50" y="50" width="40" height="30" fill="%23009077" rx="4"/><rect x="110" y="50" width="40" height="30" fill="%23004b4e" rx="4"/><rect x="170" y="50" width="40" height="30" fill="%23cd546d" rx="4"/><circle cx="70" cy="65" r="8" fill="%23ffffff"/><text x="70" y="70" font-family="Arial" font-size="10" fill="%23ffffff" text-anchor="middle">1</text><circle cx="130" cy="65" r="8" fill="%23ffffff"/><text x="130" y="70" font-family="Arial" font-size="10" fill="%23ffffff" text-anchor="middle">2</text><circle cx="190" cy="65" r="8" fill="%23ffffff"/><text x="190" y="70" font-family="Arial" font-size="10" fill="%23ffffff" text-anchor="middle">3</text><path d="M90 65h10 M150 65h10" stroke="%23cccccc" stroke-width="2" marker-end="url(%23arrowhead)"/><rect x="50" y="95" width="156" height="4" fill="%23e0e0e0" rx="2"/><rect x="50" y="105" width="120" height="4" fill="%23e0e0e0" rx="2"/><rect x="50" y="115" width="140" height="4" fill="%23e0e0e0" rx="2"/><rect x="50" y="125" width="100" height="4" fill="%23e0e0e0" rx="2"/></svg>')
                  center/contain;
    }

    .card-image-3 {
      background: linear-gradient(135deg, #f0e8f3 0%, #f5f0f8 100%),
                  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 192"><rect fill="%23fdf8fe" width="256" height="192"/><rect x="30" y="40" width="196" height="112" rx="8" fill="%23ffffff" stroke="%23e0e0e0" stroke-width="2"/><circle cx="80" cy="85" r="25" fill="%23009077"/><circle cx="80" cy="85" r="15" fill="%23ffffff"/><circle cx="80" cy="85" r="8" fill="%23cd546d"/><rect x="120" y="65" width="80" height="8" fill="%23004b4e" rx="4"/><rect x="120" y="80" width="60" height="6" fill="%23cccccc" rx="3"/><rect x="120" y="92" width="70" height="6" fill="%23cccccc" rx="3"/><rect x="120" y="104" width="50" height="6" fill="%23cccccc" rx="3"/><rect x="50" y="125" width="156" height="12" fill="%23f8f9fa" stroke="%23e0e0e0" rx="6"/><circle cx="65" cy="131" r="3" fill="%23009077"/><circle cx="75" cy="131" r="3" fill="%23009077"/><circle cx="85" cy="131" r="3" fill="%23cd546d"/><rect x="95" y="129" width="4" height="4" fill="%23cccccc"/><rect x="105" y="129" width="4" height="4" fill="%23cccccc"/><rect x="115" y="129" width="4" height="4" fill="%23cccccc"/></svg>')
                  center/contain;
    }

    .card-image-4 {
      background: linear-gradient(135deg, #e8f0f3 0%, #f0f5f8 100%),
                  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 192"><rect fill="%23f8fbfe" width="256" height="192"/><rect x="40" y="30" width="176" height="132" rx="8" fill="%23ffffff" stroke="%23e0e0e0" stroke-width="2"/><rect x="60" y="50" width="136" height="8" fill="%23004b4e" rx="4"/><circle cx="75" cy="75" r="4" fill="%23009077"/><rect x="85" y="72" width="80" height="3" fill="%23cccccc"/><rect x="85" y="78" width="60" height="2" fill="%23e0e0e0"/><circle cx="75" cy="95" r="4" fill="%23cd546d"/><rect x="85" y="92" width="70" height="3" fill="%23cccccc"/><rect x="85" y="98" width="50" height="2" fill="%23e0e0e0"/><circle cx="75" cy="115" r="4" fill="%23009077"/><rect x="85" y="112" width="90" height="3" fill="%23cccccc"/><rect x="85" y="118" width="65" height="2" fill="%23e0e0e0"/><circle cx="75" cy="135" r="4" fill="%23004b4e"/><rect x="85" y="132" width="75" height="3" fill="%23cccccc"/><rect x="85" y="138" width="55" height="2" fill="%23e0e0e0"/><rect x="180" y="70" width="20" height="15" fill="%23f8f9fa" stroke="%23e0e0e0" rx="2"/><path d="M185 77l5-3 5 3v8l-5 3-5-3z" fill="%23009077"/></svg>')
                  center/contain;
    }

    .card-image-5 {
      background: linear-gradient(135deg, #f3e8e8 0%, #f8f0f0 100%),
                  url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 192"><rect fill="%23fef8f8" width="256" height="192"/><rect x="30" y="30" width="196" height="132" rx="8" fill="%23ffffff" stroke="%23e0e0e0" stroke-width="2"/><circle cx="70" cy="70" r="15" fill="%23009077"/><circle cx="70" cy="65" r="6" fill="%23ffffff"/><rect x="70" y="75" width="12" height="8" fill="%23ffffff" rx="2"/><circle cx="130" cy="70" r="15" fill="%23004b4e"/><circle cx="130" cy="65" r="6" fill="%23ffffff"/><rect x="130" y="75" width="12" height="8" fill="%23ffffff" rx="2"/><circle cx="186" cy="70" r="15" fill="%23cd546d"/><circle cx="186" cy="65" r="6" fill="%23ffffff"/><rect x="186" y="75" width="12" height="8" fill="%23ffffff" rx="2"/><path d="M85 70h25 M155 70h16" stroke="%23cccccc" stroke-width="3" marker-end="url(%23arrowhead)"/><rect x="50" y="105" width="156" height="6" fill="%23004b4e" rx="3"/><rect x="60" y="120" width="50" height="20" fill="%23f8f9fa" stroke="%23e0e0e0" rx="4"/><rect x="130" y="120" width="50" height="20" fill="%23f8f9fa" stroke="%23e0e0e0" rx="4"/><circle cx="75" cy="130" r="3" fill="%23009077"/><circle cx="155" cy="130" r="3" fill="%23cd546d"/></svg>')
                  center/contain;
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

      .content-cards {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      }
    }

    .no-results {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }

    .no-results-content {
      text-align: center;
      color: #6b7280;
    }

    .no-results-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto 16px;
      display: block;
    }

    .no-results h3 {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 18px;
      color: #1f2937;
      margin: 0 0 8px 0;
    }

    .no-results p {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      margin: 0;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 36px;
      }

      .hero-subtitle {
        font-size: 18px;
      }

      .content-cards {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .content-card {
        width: 100%;
        max-width: 320px;
      }
    }

  `],
  template: `
    <div class="help-page">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-container">
          <div class="logo-section">
            <img src="./bord-bia-logo-green.svg" alt="Bord Bia - Irish Food Board" class="bord-bia-logo" (click)="onNavigateToHome.emit()" style="cursor: pointer;">
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
              <button class="breadcrumb-button" (click)="onNavigateToHome.emit()">
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
          <div class="hero-image">
            <!-- Background image will be set via CSS -->
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="content-section">
        <div class="content-header">
                    <h2 class="content-title">All FRS HelpDesk Content</h2>
          <div class="search-workshops">
            <div class="search-container">
              <input 
                type="text" 
                placeholder="Search Content" 
                class="search-input"
                [(ngModel)]="searchQuery">
              <button class="search-button">
                <svg class="search-button-icon" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="content-cards">
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

          <!-- No results message -->
          <div *ngIf="filteredCards.length === 0 && searchQuery.trim()" class="no-results">
            <div class="no-results-content">
              <svg class="no-results-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#ccc" stroke-width="2" fill="none"/>
                <path d="M15 9L9 15M9 9L15 15" stroke="#ccc" stroke-width="2"/>
              </svg>
              <h3>No content found</h3>
              <p>Try adjusting your search terms or browse all available content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HelpSupportPageComponent {
  @Output() onNavigateToBulkAssignment = new EventEmitter<void>();
  @Output() onNavigateToHome = new EventEmitter<void>();
  @Output() onNavigateToHelp = new EventEmitter<void>();
  @Output() onNavigateTo = new EventEmitter<string>();
  @Output() onNavigateToPreAuditCalls = new EventEmitter<void>();
  @Output() onNavigateToTaskAssignment = new EventEmitter<void>();
  @Output() onNavigateToCallLogging = new EventEmitter<void>();
  @Output() onNavigateToHelpDeskHistory = new EventEmitter<void>();

  searchQuery = '';
  
  contentCards = [
    {
      id: 'pre-audit-calls',
      title: 'Pre-Audit Calls',
      minutes: '5 Minutes',
      date: '21/09/25',
      imageClass: 'card-image-1',
      keywords: ['pre-audit', 'calls', 'preparation', 'communication', 'before'],
      clickHandler: () => this.onNavigateToPreAuditCalls.emit()
    },
    {
      id: 'task-assignment',
      title: 'Task Assignment',
      minutes: '8 Minutes',
      date: '19/09/25',
      imageClass: 'card-image-2',
      keywords: ['task', 'assignment', 'manage', 'audit', 'workflow'],
      clickHandler: () => this.onNavigateToTaskAssignment.emit()
    },
    {
      id: 'call-logging',
      title: 'Call Logging',
      minutes: '7 Minutes',
      date: '15/09/25',
      imageClass: 'card-image-3',
      keywords: ['call', 'logging', 'recording', 'tracking', 'phone', 'communication'],
      clickHandler: () => this.onNavigateToCallLogging.emit()
    },
    {
      id: 'help-desk-history',
      title: 'Help Desk History',
      minutes: '9 Minutes',
      date: '14/09/25',
      imageClass: 'card-image-4',
      keywords: ['help', 'desk', 'history', 'past', 'records'],
      clickHandler: () => this.onNavigateToHelpDeskHistory.emit()
    },
    {
      id: 'bulk-assignment',
      title: 'Bulk Assignment of Auditors',
      minutes: '9 Minutes',
      date: '12/09/25',
      imageClass: 'card-image-5',
      keywords: ['bulk', 'assignment', 'auditors', 'assign', 'multiple', 'audit'],
      clickHandler: () => this.onNavigateToBulkAssignment.emit()
    }
  ];

  get filteredCards() {
    if (!this.searchQuery.trim()) {
      return this.contentCards;
    }
    
    const query = this.searchQuery.toLowerCase();
    return this.contentCards.filter(card => 
      card.title.toLowerCase().includes(query) ||
      card.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
  }

  handleCardClick(card: any) {
    if (card.clickHandler) {
      card.clickHandler();
    }
  }

  handleSearchResult(result: SearchResult) {
    // Handle navigation based on search result
    if (result.url === '/bulk-assignment') {
      this.onNavigateToBulkAssignment.emit();
    } else if (result.url === '/help-support') {
      // Stay on current page or refresh content
      console.log('Search result for help & support:', result.title);
    }
    // Add more navigation cases as needed
  }
}