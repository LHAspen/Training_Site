import { Component, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchComponent } from './global-search.component';
import { SearchResult } from '../services/search.service';

@Component({
  selector: 'app-help-desk-history-article',
  standalone: true,
  imports: [CommonModule, GlobalSearchComponent],
  styles: [`
    .article-page {
      width: 100%;
      min-height: 100vh;
      background: #f8f9fa;
    }

    /* Header Section */
    .header-section {
      background: white;
      padding: 16px 40px;
      border-bottom: 1px solid #e0e0e0;
    }

    .header-container {
      max-width: 1920px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
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
    }

    .search-button-header, .logout-button {
      background: none;
      border: none;
      color: #1c4a4c;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #1c4a4c 0%, #004b4e 50%, #009077 100%);
      padding: 60px 40px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1920px;
      margin: 0 auto;
      min-height: 300px;
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
      margin: 0 0 20px 0;
      line-height: 1.1;
    }

    .hero-meta {
      display: flex;
      align-items: center;
      gap: 30px;
      margin-top: 20px;
    }

    .hero-meta .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: rgba(255, 255, 255, 0.9) !important;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 16px;
    }

    .hero-meta .meta-item svg {
      stroke: rgba(255, 255, 255, 0.9) !important;
      fill: none !important;
    }

    .hero-image {
      flex: 1;
      max-width: 500px;
      height: 250px;
      background: linear-gradient(135deg, rgba(28,74,76,0.7) 0%, rgba(0,144,119,0.7) 100%);
      background-size: cover;
      border-radius: 12px;
      margin-left: 40px;
    }

    /* Main Content Layout */
    .content-layout {
      max-width: 1920px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 280px 1fr 368px;
      gap: 40px;
      padding: 40px;
      align-items: start;
    }

    /* Table of Contents Sidebar */
    .toc-sidebar {
      background: white;
      border-radius: 12px;
      padding: 24px;
      height: fit-content;
      position: sticky;
      top: 40px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 0;
    }

    .toc-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 18px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 0 0 20px 0;
    }

    .toc-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .toc-item {
      margin-bottom: 8px;
    }

    .toc-link {
      color: #666;
      background: none;
      border: none;
      text-decoration: none;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      display: block;
      width: 100%;
      text-align: left;
      padding: 8px 12px;
      border-radius: 6px;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }

    .toc-link:hover {
      background: #f8f9fa;
      color: #009077;
      border-left-color: #009077;
    }

    .toc-link.active {
      background: rgba(0, 144, 119, 0.1);
      color: #009077;
      border-left-color: #009077;
      font-weight: 500;
    }

    .toc-link:focus {
      outline: 2px solid #009077;
      outline-offset: 2px;
    }

    /* Main Article Content */
    .article-content {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      line-height: 1.6;
    }

    .article-content h1 {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 32px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 0 0 24px 0;
      padding-bottom: 16px;
      border-bottom: 2px solid #009077;
    }

    .article-content h2 {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 24px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 40px 0 20px 0;
      scroll-margin-top: 80px;
    }

    .article-content h3 {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 20px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 32px 0 16px 0;
      scroll-margin-top: 80px;
    }

    .article-content p {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 16px;
      color: #333;
      margin: 0 0 20px 0;
      line-height: 1.6;
    }

    .article-content ul, .article-content ol {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 16px;
      color: #333;
      margin: 0 0 20px 0;
      padding-left: 20px;
    }

    .article-content li {
      margin-bottom: 8px;
      line-height: 1.6;
    }

    .article-content .highlight-box {
      background: linear-gradient(135deg, rgba(0, 144, 119, 0.05) 0%, rgba(28, 74, 76, 0.05) 100%);
      border-left: 4px solid #009077;
      padding: 20px;
      margin: 24px 0;
      border-radius: 0 8px 8px 0;
    }

    .article-content .highlight-box p {
      margin-bottom: 0;
      font-weight: 500;
    }

    /* Related Content Sidebar */
    .related-sidebar {
      width: 368px;
    }

    .related-content-wrapper {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 40px;
    }

    .related-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 18px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 0 0 20px 0;
    }

    .related-item {
      display: flex;
      flex-direction: column;
      padding: 16px;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      margin-bottom: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
    }

    .related-item:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-color: #009077;
    }

    .related-item-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 16px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 0 0 8px 0;
      line-height: 1.3;
    }

    .related-item-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 12px;
      color: #666;
    }

    .related-item:last-child {
      margin-bottom: 0;
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
      .content-layout {
        grid-template-columns: 1fr;
        gap: 30px;
        padding: 20px;
      }
      
      .related-sidebar {
        width: 100%;
        order: -1;
      }
      
      .hero-section {
        flex-direction: column;
        text-align: center;
        padding: 40px 20px;
      }
      
      .hero-image {
        margin-left: 0;
        margin-top: 30px;
        max-width: 100%;
      }
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 36px;
      }
      
      .content-layout {
        padding: 16px;
      }
      
      .article-content {
        padding: 24px;
      }
      
      .toc-sidebar, .related-content-wrapper {
        padding: 20px;
      }
    }

    /* Access Restriction Modal Styles */
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
  `],
  template: `
    <div class="article-page">
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
              <button class="breadcrumb-button" (click)="onNavigateToHelp.emit()">
                FSR HelpDesk
              </button>
            </li>
            <li class="breadcrumb-item">
              <span class="breadcrumb-separator">></span>
            </li>
            <li class="breadcrumb-item">
              <span class="breadcrumb-current">Help Desk History</span>
            </li>
          </ol>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Help Desk History</h1>
          <div class="hero-meta">
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>9 Minutes</span>
            </div>
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>14/09/25</span>
            </div>
          </div>
        </div>
        <div class="hero-image hero-grass">
          <img src="assets/Touching_grass.webp" alt="Help Desk History" />
        </div>
      </div>

      <!-- Content Layout -->
      <div class="content-layout">
        <!-- Table of Contents -->
        <div class="toc-sidebar">
          <h3 class="toc-title">Table of Contents</h3>
          <ul class="toc-list">
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'overview'" (click)="scrollToSection($event, 'overview')">
                Overview
              </button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'accessing-history'" (click)="scrollToSection($event, 'accessing-history')">
                Accessing History
              </button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'record-types'" (click)="scrollToSection($event, 'record-types')">
                Record Types
              </button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'analysis-tools'" (click)="scrollToSection($event, 'analysis-tools')">
                Analysis Tools
              </button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'maintenance'" (click)="scrollToSection($event, 'maintenance')">
                Data Maintenance
              </button>
            </li>
          </ul>
        </div>

        <!-- Main Article Content -->
        <div class="article-content">
          <h1 id="overview">Help Desk History Overview</h1>
          <p>
            Help Desk History provides comprehensive access to historical records of support interactions, 
            ticket resolutions, and system activities. This valuable resource enables teams to track patterns, 
            identify recurring issues, and leverage past solutions to improve future support efficiency and quality.
          </p>

          <div class="highlight-box">
            <p>
              <strong>Key Value:</strong> Historical data analysis helps identify trends, improve response 
              times, and build a knowledge base of proven solutions for common issues.
            </p>
          </div>

          <h2 id="accessing-history">Accessing Historical Records</h2>
          <p>
            The system provides multiple pathways to access historical information, each designed 
            for specific use cases and user requirements:
          </p>

          <h3>Search and Filter Options</h3>
          <ul>
            <li>Date range selection for targeted time periods</li>
            <li>Ticket status and priority level filters</li>
            <li>User, client, or department-specific searches</li>
            <li>Issue category and resolution type filtering</li>
            <li>Keyword searches across ticket content and notes</li>
          </ul>

          <h3>Quick Access Features</h3>
          <ul>
            <li>Recent activity dashboard for immediate insights</li>
            <li>Bookmarked queries for frequently accessed data</li>
            <li>Saved search templates for standard reports</li>
            <li>Direct links from current tickets to related history</li>
          </ul>

          <h3>Export and Reporting</h3>
          <ul>
            <li>CSV and Excel export options for external analysis</li>
            <li>PDF reports for documentation and presentations</li>
            <li>Scheduled automatic reports for regular monitoring</li>
            <li>Custom report builders for specific requirements</li>
          </ul>

          <h2 id="record-types">Types of Historical Records</h2>
          <p>
            Understanding the different categories of historical data helps users locate 
            relevant information efficiently:
          </p>

          <h3>Support Tickets and Interactions</h3>
          <ul>
            <li>Complete ticket lifecycle from creation to closure</li>
            <li>All communication threads and updates</li>
            <li>Escalation history and approval chains</li>
            <li>Resolution details and implemented solutions</li>
            <li>User satisfaction ratings and feedback</li>
          </ul>

          <div class="highlight-box">
            <p>
              <strong>Pro Tip:</strong> Use similar issue searches to quickly find previously 
              successful resolutions that can be adapted for current problems.
            </p>
          </div>

          <h3>System Activities and Changes</h3>
          <ul>
            <li>Configuration updates and system modifications</li>
            <li>User access changes and permission updates</li>
            <li>Software deployments and version changes</li>
            <li>Maintenance activities and scheduled downtime</li>
            <li>Performance metrics and system health data</li>
          </ul>

          <h3>Knowledge Base Evolution</h3>
          <ul>
            <li>Article creation, updates, and retirement history</li>
            <li>Usage statistics and effectiveness metrics</li>
            <li>User feedback and improvement suggestions</li>
            <li>Content review cycles and approval processes</li>
          </ul>

          <h2 id="analysis-tools">Analysis and Reporting Tools</h2>
          <p>
            Leverage built-in analysis tools to extract meaningful insights from historical data:
          </p>

          <h3>Trend Analysis</h3>
          <ul>
            <li>Volume trends over time periods</li>
            <li>Resolution time improvements or degradation</li>
            <li>Recurring issue identification and patterns</li>
            <li>Seasonal variations in support requests</li>
            <li>Team performance metrics and comparisons</li>
          </ul>

          <h3>Performance Metrics</h3>
          <ul>
            <li>First-call resolution rates and trends</li>
            <li>Average response and resolution times</li>
            <li>Customer satisfaction score tracking</li>
            <li>Agent productivity and utilization rates</li>
            <li>Escalation frequency and success rates</li>
          </ul>

          <h3>Predictive Insights</h3>
          <ul>
            <li>Capacity planning based on historical volumes</li>
            <li>Proactive maintenance scheduling recommendations</li>
            <li>Training needs identification from common issues</li>
            <li>Resource allocation optimization suggestions</li>
          </ul>

          <h2 id="maintenance">Data Maintenance and Archival</h2>
          <p>
            Proper maintenance of historical data ensures system performance and regulatory compliance:
          </p>

          <h3>Retention Policies</h3>
          <ul>
            <li>Active data retention periods by record type</li>
            <li>Archival schedules for older records</li>
            <li>Legal and compliance requirement adherence</li>
            <li>Data purging procedures for obsolete information</li>
          </ul>

          <h3>Data Quality Management</h3>
          <ul>
            <li>Regular data integrity checks and validations</li>
            <li>Duplicate record identification and cleanup</li>
            <li>Missing information identification and completion</li>
            <li>Standardization of data formats and classifications</li>
          </ul>

          <div class="highlight-box">
            <p>
              <strong>Best Practice:</strong> Regular review of historical data quality ensures 
              reliable analysis results and maintains system performance over time.
            </p>
          </div>

          <h3>Privacy and Security</h3>
          <ul>
            <li>Access control and permission management</li>
            <li>Personal data protection and anonymization</li>
            <li>Audit trails for data access and modifications</li>
            <li>Secure archival and backup procedures</li>
            <li>Compliance with data protection regulations</li>
          </ul>

          <h3>System Optimization</h3>
          <ul>
            <li>Database performance monitoring and tuning</li>
            <li>Storage capacity planning and management</li>
            <li>Index optimization for faster searches</li>
            <li>Regular system maintenance and updates</li>
            <li>Performance benchmarking and improvement tracking</li>
          </ul>
        </div>

        <!-- Related Content Sidebar -->
        <div class="related-sidebar">
          <div class="related-content-wrapper">
            <h3 class="related-title">Related Content</h3>
            
            <a class="related-item" (click)="onNavigateToCallLogging.emit()">
              <div class="related-item-title">Call Logging</div>
              <div class="related-item-meta">
                <span>7 Minutes</span>
                <span>•</span>
                <span>15/09/25</span>
              </div>
            </a>

            <a class="related-item" (click)="onNavigateToTaskAssignment.emit()">
              <div class="related-item-title">Task Assignment</div>
              <div class="related-item-meta">
                <span>8 Minutes</span>
                <span>•</span>
                <span>19/09/25</span>
              </div>
            </a>

            <a class="related-item" (click)="onNavigateToBulkAssignment.emit()">
              <div class="related-item-title">Bulk Assignment of Auditors</div>
              <div class="related-item-meta">
                <span>9 Minutes</span>
                <span>•</span>
                <span>12/09/25</span>
              </div>
            </a>
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
export class HelpDeskHistoryArticleComponent implements OnInit, OnDestroy {
  @Output() onNavigateToHome = new EventEmitter<void>();
  @Output() onNavigateToHelp = new EventEmitter<void>();
  @Output() onNavigateToBulkAssignment = new EventEmitter<void>();
  @Output() onNavigateToCallLogging = new EventEmitter<void>();
  @Output() onNavigateToTaskAssignment = new EventEmitter<void>();

  activeSection = 'overview';
  showModal = false;

  ngOnInit() {
    this.updateActiveSection();
  }

  ngOnDestroy() {
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.updateActiveSection();
  }

  private lastScrollUpdate = 0;
  
  private updateActiveSection() {
    const now = Date.now();
    if (now - this.lastScrollUpdate < 100) {
      return; // Throttle updates to prevent rapid changes
    }
    this.lastScrollUpdate = now;
    
    const sections = ['overview', 'accessing-history', 'record-types', 'analysis-tools', 'maintenance'];
    const scrollPosition = window.pageYOffset + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        if (this.activeSection !== sections[i]) {
          this.activeSection = sections[i];
        }
        break;
      }
    }
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    event.stopPropagation();
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Update active section immediately for better UX
      this.activeSection = sectionId;
      
      // Use a slight delay to prevent conflicts with scroll listener
      setTimeout(() => {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }, 10);
    }
  }

  handleSearchResult(result: SearchResult) {
    if (result.url === '/bulk-assignment') {
      this.onNavigateToBulkAssignment.emit();
    } else if (result.url === '/help-support') {
      this.onNavigateToHelp.emit();
    } else if (result.url === '/restricted' || result.url === '/restricted-frs') {
      // Show access modal for restricted content
      this.showAccessModal();
    }
  }

  showAccessModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}