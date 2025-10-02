import { Component, Output, EventEmitter } from '@angular/core';
import { GlobalSearchComponent } from './global-search.component';
import { SearchResult } from '../services/search.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [GlobalSearchComponent],
  styles: [`
    .landing-page {
      width: 100%;
      min-height: 100vh;
      background: #f8f9fa;
      position: relative;
    }

    /* Header Section with Logo and Actions */
    .header-section {
      background: white;
      padding: 16px 40px;
      border-bottom: 1px solid #e0e0e0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-container {
      max-width: 1920px;
      margin: 0 auto;
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

    .header-actions {
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
      color: #1c4a4c;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }

    .logout-button {
      background: none;
      border: none;
      color: #1c4a4c;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      cursor: pointer;
      font-weight: 500;
    }

    /* Hero Section with Training Portal Title and Hero Image */
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
      flex: 1;
      max-width: 600px;
      height: 300px;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-family="BordBiaSans-Regular" font-size="16" fill="%23666">Hero Image Area</text></svg>') no-repeat center center;
      background-size: cover;
      border-radius: 12px;
      margin-left: 40px;
    }

    /* Help Section */
    .help-section {
      padding: 60px 40px;
      max-width: 1920px;
      margin: 0 auto;
      text-align: center;
    }

    .help-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 32px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 0 0 60px 0;
    }

    .content-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
      justify-items: center;
    }

    .content-card {
      width: 100%;
      height: 96px;
      background: white;
      border: 2px solid #004b4e;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0 32px;
      position: relative;
    }

    .content-card:hover {
      background: #009077;
      border-color: #009077;
    }

    .content-card:hover .card-text {
      color: white;
    }

    .content-card:hover .card-arrow {
      color: white;
    }

    .card-text {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #004b4e;
      transition: color 0.3s ease;
    }

    .card-arrow {
      color: #009077;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
    }

    @media (max-width: 1200px) {
      .header-section {
        padding: 16px 20px;
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

      .help-section {
        padding: 40px 20px;
      }

      .help-title {
        font-size: 28px;
      }

      .content-cards {
        grid-template-columns: 1fr;
        gap: 16px;
        width: 100%;
      }

      .content-card {
        height: 80px;
        width: 100%;
        max-width: none;
      }

      .card-text {
        font-size: 18px;
      }
    }


  `],
  template: `
    <div class="landing-page">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-container">
          <div class="logo-section">
            <img src="./bord-bia-logo-green.svg" alt="Bord Bia - Irish Food Board" class="bord-bia-logo">
          </div>
          <div class="header-actions">
            <app-global-search (onSearchResult)="handleSearchResult($event)"></app-global-search>
            <button class="logout-button">Logout</button>
          </div>
        </div>
      </div>

      <!-- Hero Section with Training Portal Title -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Bord Bia Training Portal</h1>
          <p class="hero-subtitle">Discover the platform's capabilities</p>
        </div>
        <div class="hero-image">
          <!-- Hero image area -->
        </div>
      </div>

            <!-- What do you need help with Section -->
      <div class="help-section">
        <h2 class="help-title">What do you need help with?</h2>
        <div class="content-cards">
          <div class="content-card" (click)="onNavigateToHelp.emit()">
            <span class="card-text">System Overview</span>
            <div class="card-arrow">
              <svg viewBox="0 0 640 640" fill="currentColor">
                <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/>
              </svg>
            </div>
          </div>
          <div class="content-card" (click)="onNavigateToHelp.emit()">
            <span class="card-text">Users & Roles</span>
            <div class="card-arrow">
              <svg viewBox="0 0 640 640" fill="currentColor">
                <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/>
              </svg>
            </div>
          </div>
          <div class="content-card" (click)="onNavigateToHelp.emit()">
            <span class="card-text">Assignments & Review</span>
            <div class="card-arrow">
              <svg viewBox="0 0 640 640" fill="currentColor">
                <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/>
              </svg>
            </div>
          </div>
          <div class="content-card" (click)="onNavigateToHelp.emit()">
            <span class="card-text">Pig Scheme</span>
            <div class="card-arrow">
              <svg viewBox="0 0 640 640" fill="currentColor">
                <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/>
              </svg>
            </div>
          </div>
          <div class="content-card" (click)="onNavigateToHelp.emit()">
            <span class="card-text">FRS HelpDesk</span>
            <div class="card-arrow">
              <svg viewBox="0 0 640 640" fill="currentColor">
                <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/>
              </svg>
            </div>
          </div>
          <div class="content-card" (click)="onNavigateToHelp.emit()">
            <span class="card-text">Member Portal</span>
            <div class="card-arrow">
              <svg viewBox="0 0 640 640" fill="currentColor">
                <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LandingPageComponent {
  @Output() onNavigateToHelp = new EventEmitter<void>();
  @Output() onNavigateTo = new EventEmitter<string>();

  handleSearchResult(result: SearchResult) {
    // Handle navigation based on search result
    if (result.url === '/help-support') {
      this.onNavigateToHelp.emit();
    } else if (result.url === '/bulk-assignment') {
      this.onNavigateTo.emit('bulk-assignment');
    }
    // Add more navigation cases as needed
  }
}
