import { Component, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GlobalSearchComponent } from './global-search.component';
import { SearchResult } from '../services/search.service';

@Component({
  selector: 'app-pre-audit-calls-article',
  standalone: true,
  imports: [GlobalSearchComponent],
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
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="rgba(255,255,255,0.1)" rx="8"/><g transform="translate(200,125)"><circle r="40" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><path d="M-15,-10 L15,0 L-15,10 Z" fill="rgba(255,255,255,0.8)"/></g><text x="50%" y="80%" text-anchor="middle" font-family="BordBiaSans-Regular" font-size="12" fill="rgba(255,255,255,0.6)">Pre-Audit Communication</text></svg>') no-repeat center center;
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
              <span class="breadcrumb-current">Pre-Audit Calls</span>
            </li>
          </ol>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Pre-Audit Calls</h1>
          <div class="hero-meta">
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>5 Minutes</span>
            </div>
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>21/09/25</span>
            </div>
          </div>
        </div>
        <div class="hero-image"></div>
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
              <button class="toc-link" [class.active]="activeSection === 'preparation'" (click)="scrollToSection($event, 'preparation')">
                Call Preparation
              </button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'best-practices'" (click)="scrollToSection($event, 'best-practices')">
                Best Practices
              </button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'documentation'" (click)="scrollToSection($event, 'documentation')">
                Documentation
              </button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'follow-up'" (click)="scrollToSection($event, 'follow-up')">
                Follow-up Actions
              </button>
            </li>
          </ul>
        </div>

        <!-- Main Article Content -->
        <div class="article-content">
          <h1 id="overview">Pre-Audit Call Overview</h1>
          <p>
            Pre-audit calls are essential communications that occur before conducting formal audits. 
            These calls help establish expectations, verify logistics, and ensure both auditors and 
            auditees are properly prepared for the upcoming audit process.
          </p>

          <div class="highlight-box">
            <p>
              <strong>Key Objective:</strong> Pre-audit calls reduce surprises, improve audit efficiency, 
              and foster positive relationships between auditors and auditees from the outset.
            </p>
          </div>

          <h2 id="preparation">Call Preparation</h2>
          <p>
            Proper preparation is crucial for effective pre-audit calls. Follow these essential steps 
            to ensure productive communications:
          </p>

          <h3>Before the Call</h3>
          <ul>
            <li>Review the audit scope and requirements thoroughly</li>
            <li>Prepare a structured agenda with key discussion points</li>
            <li>Gather relevant documentation and reference materials</li>
            <li>Confirm participant availability and contact information</li>
            <li>Schedule the call with adequate notice (minimum 48 hours)</li>
          </ul>

          <h3>Information to Gather</h3>
          <ul>
            <li>Site access requirements and security protocols</li>
            <li>Key personnel availability during audit dates</li>
            <li>Documentation readiness and format preferences</li>
            <li>Any special considerations or constraints</li>
            <li>Preferred communication channels for updates</li>
          </ul>

          <h2 id="best-practices">Best Practices</h2>
          <p>
            Implementing these best practices will enhance the effectiveness of your pre-audit calls 
            and contribute to successful audit outcomes:
          </p>

          <h3>Communication Guidelines</h3>
          <ul>
            <li>Maintain a professional and collaborative tone throughout</li>
            <li>Use clear, jargon-free language appropriate for all participants</li>
            <li>Allow adequate time for questions and clarifications</li>
            <li>Confirm understanding of key points before proceeding</li>
            <li>Provide contact information for ongoing communication</li>
          </ul>

          <div class="highlight-box">
            <p>
              <strong>Pro Tip:</strong> Always send a follow-up email summarizing key discussion 
              points and confirmed arrangements within 24 hours of the call.
            </p>
          </div>

          <h3>Scheduling Considerations</h3>
          <ul>
            <li>Allow 30-45 minutes for comprehensive discussions</li>
            <li>Schedule during business hours when key personnel are available</li>
            <li>Consider time zones for multi-location audits</li>
            <li>Have backup dates ready in case of conflicts</li>
          </ul>

          <h2 id="documentation">Documentation Requirements</h2>
          <p>
            Proper documentation of pre-audit calls ensures continuity and provides valuable 
            reference material throughout the audit process:
          </p>

          <h3>Call Notes Should Include</h3>
          <ul>
            <li>Date, time, and duration of the call</li>
            <li>Names and roles of all participants</li>
            <li>Key discussion points and decisions made</li>
            <li>Confirmed logistics and arrangements</li>
            <li>Action items with assigned responsibilities</li>
            <li>Next steps and follow-up requirements</li>
          </ul>

          <h3>File Management</h3>
          <p>
            Store all pre-audit call documentation in the designated audit folder with clear 
            naming conventions. This ensures easy access for all team members and maintains 
            proper audit trails.
          </p>

          <h2 id="follow-up">Follow-up Actions</h2>
          <p>
            Effective follow-up after pre-audit calls is essential for maintaining momentum 
            and ensuring all parties remain aligned:
          </p>

          <h3>Immediate Actions (Within 24 Hours)</h3>
          <ul>
            <li>Send summary email with key points and confirmations</li>
            <li>Update audit scheduling systems with confirmed details</li>
            <li>Distribute relevant information to audit team members</li>
            <li>Set reminders for any promised follow-up actions</li>
          </ul>

          <h3>Ongoing Communication</h3>
          <ul>
            <li>Check in periodically leading up to the audit date</li>
            <li>Confirm final arrangements 2-3 days before the audit</li>
            <li>Be available to address any last-minute questions or concerns</li>
            <li>Provide clear contact information for day-of-audit coordination</li>
          </ul>

          <div class="highlight-box">
            <p>
              <strong>Remember:</strong> Successful pre-audit calls set the foundation for 
              efficient, productive audits that benefit all stakeholders involved.
            </p>
          </div>
        </div>

        <!-- Related Content Sidebar -->
        <div class="related-sidebar">
          <div class="related-content-wrapper">
            <h3 class="related-title">Related Content</h3>
            
            <a class="related-item" (click)="onNavigateToTaskAssignment.emit()">
              <div class="related-item-title">Task Assignment</div>
              <div class="related-item-meta">
                <span>8 Minutes</span>
                <span>•</span>
                <span>19/09/25</span>
              </div>
            </a>

            <a class="related-item" (click)="onNavigateToCallLogging.emit()">
              <div class="related-item-title">Call Logging</div>
              <div class="related-item-meta">
                <span>7 Minutes</span>
                <span>•</span>
                <span>15/09/25</span>
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
    </div>
  `
})
export class PreAuditCallsArticleComponent implements OnInit, OnDestroy {
  @Output() onNavigateToHome = new EventEmitter<void>();
  @Output() onNavigateToHelp = new EventEmitter<void>();
  @Output() onNavigateToBulkAssignment = new EventEmitter<void>();
  @Output() onNavigateToTaskAssignment = new EventEmitter<void>();
  @Output() onNavigateToCallLogging = new EventEmitter<void>();

  activeSection = 'overview';

  ngOnInit() {
    // Set initial active section
    this.updateActiveSection();
  }

  ngOnDestroy() {
    // Cleanup if needed
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
    
    const sections = ['overview', 'preparation', 'best-practices', 'documentation', 'follow-up'];
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
        const offsetTop = element.offsetTop - 80; // Account for header
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }, 10);
    }
  }

  handleSearchResult(result: SearchResult) {
    if (result.url === '/bulk-assignment') {
      this.onNavigateToBulkAssignment.emit();
    } else if (result.url === '/help-support') {
      this.onNavigateToHelp.emit();
    }
  }
}