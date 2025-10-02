import { Component, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GlobalSearchComponent } from './global-search.component';
import { SearchResult } from '../services/search.service';

@Component({
  selector: 'app-call-logging-article',
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
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="rgba(255,255,255,0.1)" rx="8"/><g transform="translate(200,125)"><circle r="30" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><path d="M-10,-10 L10,10 M10,-10 L-10,10" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><rect x="-25" y="15" width="50" height="20" fill="rgba(255,255,255,0.3)" rx="4"/><line x1="-20" y1="20" x2="20" y2="20" stroke="rgba(255,255,255,0.6)" stroke-width="1"/><line x1="-20" y1="25" x2="10" y2="25" stroke="rgba(255,255,255,0.6)" stroke-width="1"/><line x1="-20" y1="30" x2="15" y2="30" stroke="rgba(255,255,255,0.6)" stroke-width="1"/></g><text x="50%" y="80%" text-anchor="middle" font-family="BordBiaSans-Regular" font-size="12" fill="rgba(255,255,255,0.6)">Call Recording System</text></svg>') no-repeat center center;
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
              <span class="breadcrumb-current">Call Logging</span>
            </li>
          </ol>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Call Logging</h1>
          <div class="hero-meta">
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>7 Minutes</span>
            </div>
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>15/09/25</span>
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
              <button class="toc-link" [class.active]="activeSection === 'logging-process'" (click)="scrollToSection($event, 'logging-process')">
                Logging Process
              </button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'information-requirements'" (click)="scrollToSection($event, 'information-requirements')">
                Information Requirements
              </button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'system-usage'" (click)="scrollToSection($event, 'system-usage')">
                System Usage
              </button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'quality-assurance'" (click)="scrollToSection($event, 'quality-assurance')">
                Quality Assurance
              </button>
            </li>
          </ul>
        </div>

        <!-- Main Article Content -->
        <div class="article-content">
          <h1 id="overview">Call Logging Overview</h1>
          <p>
            Call logging is a critical component of audit documentation and communication tracking. 
            It provides a comprehensive record of all phone communications related to audit activities, 
            ensuring transparency, accountability, and proper follow-up on important discussions and decisions.
          </p>

          <div class="highlight-box">
            <p>
              <strong>Core Purpose:</strong> Call logging maintains accurate records of communications 
              to support audit trails, facilitate follow-up actions, and ensure consistent information sharing.
            </p>
          </div>

          <h2 id="logging-process">Call Logging Process</h2>
          <p>
            Follow this systematic approach to ensure all relevant calls are properly documented 
            and accessible for future reference:
          </p>

          <h3>Before the Call</h3>
          <ul>
            <li>Prepare call objectives and key discussion points</li>
            <li>Have logging template or system readily available</li>
            <li>Gather relevant documentation and reference materials</li>
            <li>Ensure proper identification of participants</li>
          </ul>

          <h3>During the Call</h3>
          <ul>
            <li>Record start time and participant details immediately</li>
            <li>Take detailed notes of key discussion points</li>
            <li>Document decisions made and action items assigned</li>
            <li>Note any commitments or deadlines established</li>
            <li>Capture follow-up requirements and next steps</li>
          </ul>

          <h3>After the Call</h3>
          <ul>
            <li>Complete call log entry within 30 minutes</li>
            <li>Review notes for accuracy and completeness</li>
            <li>Distribute summary to relevant stakeholders if required</li>
            <li>Set reminders for any follow-up actions</li>
            <li>File documentation in appropriate system location</li>
          </ul>

          <h2 id="information-requirements">Information Requirements</h2>
          <p>
            Comprehensive call logs should capture all essential information to provide value 
            for audit purposes and future reference:
          </p>

          <h3>Basic Call Details</h3>
          <ul>
            <li>Date and time of call (start and end)</li>
            <li>Names and titles of all participants</li>
            <li>Organization/company affiliations</li>
            <li>Call type (incoming, outgoing, conference)</li>
            <li>Primary purpose or objective of the call</li>
          </ul>

          <div class="highlight-box">
            <p>
              <strong>Best Practice:</strong> Use standardized templates to ensure consistency 
              in information capture across all team members and call types.
            </p>
          </div>

          <h3>Content Documentation</h3>
          <ul>
            <li>Summary of topics discussed and key points covered</li>
            <li>Decisions made during the call</li>
            <li>Action items with assigned responsibilities</li>
            <li>Deadlines and milestone dates established</li>
            <li>Issues or concerns raised and their status</li>
            <li>Next steps and follow-up requirements</li>
          </ul>

          <h3>Additional Context</h3>
          <ul>
            <li>Related audit or project references</li>
            <li>Supporting documentation mentioned</li>
            <li>External factors or constraints discussed</li>
            <li>Escalation or approval requirements identified</li>
          </ul>

          <h2 id="system-usage">System Usage Guidelines</h2>
          <p>
            Proper use of call logging systems ensures data integrity and accessibility:
          </p>

          <h3>System Access and Security</h3>
          <ul>
            <li>Use secure, authorized systems only</li>
            <li>Maintain confidentiality of sensitive information</li>
            <li>Follow data protection and privacy requirements</li>
            <li>Regular password updates and access reviews</li>
          </ul>

          <h3>Data Entry Standards</h3>
          <ul>
            <li>Use clear, professional language in all entries</li>
            <li>Avoid abbreviations unless universally understood</li>
            <li>Include complete dates and time stamps</li>
            <li>Cross-reference related entries and documentation</li>
            <li>Use consistent naming conventions for participants</li>
          </ul>

          <h3>Search and Retrieval</h3>
          <ul>
            <li>Use relevant keywords and tags for easy searching</li>
            <li>Maintain consistent categorization methods</li>
            <li>Regular system maintenance and data cleanup</li>
            <li>Backup and archival procedures compliance</li>
          </ul>

          <h2 id="quality-assurance">Quality Assurance</h2>
          <p>
            Maintaining high-quality call logs requires ongoing attention to accuracy and completeness:
          </p>

          <h3>Review Procedures</h3>
          <ul>
            <li>Self-review entries for accuracy before finalizing</li>
            <li>Supervisor spot-checks of call log quality</li>
            <li>Regular team training on logging best practices</li>
            <li>Feedback mechanisms for continuous improvement</li>
          </ul>

          <h3>Common Quality Issues to Avoid</h3>
          <ul>
            <li>Incomplete participant information</li>
            <li>Vague or unclear action item descriptions</li>
            <li>Missing deadlines or timeline information</li>
            <li>Inconsistent formatting or terminology</li>
            <li>Delayed entry creation leading to information loss</li>
          </ul>

          <div class="highlight-box">
            <p>
              <strong>Quality Tip:</strong> Review call logs regularly as part of audit file 
              preparation to ensure completeness and identify any missing follow-up actions.
            </p>
          </div>

          <h3>Continuous Improvement</h3>
          <ul>
            <li>Regular assessment of logging effectiveness</li>
            <li>Team feedback sessions on process improvements</li>
            <li>System updates and feature enhancements</li>
            <li>Training updates based on identified needs</li>
            <li>Benchmarking against industry best practices</li>
          </ul>
        </div>

        <!-- Related Content Sidebar -->
        <div class="related-sidebar">
          <div class="related-content-wrapper">
            <h3 class="related-title">Related Content</h3>
            
            <a class="related-item" (click)="onNavigateToPreAuditCalls.emit()">
              <div class="related-item-title">Pre-Audit Calls</div>
              <div class="related-item-meta">
                <span>5 Minutes</span>
                <span>•</span>
                <span>21/09/25</span>
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

            <a class="related-item" (click)="onNavigateToHelpDeskHistory.emit()">
              <div class="related-item-title">Help Desk History</div>
              <div class="related-item-meta">
                <span>9 Minutes</span>
                <span>•</span>
                <span>14/09/25</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CallLoggingArticleComponent implements OnInit, OnDestroy {
  @Output() onNavigateToHome = new EventEmitter<void>();
  @Output() onNavigateToHelp = new EventEmitter<void>();
  @Output() onNavigateToBulkAssignment = new EventEmitter<void>();
  @Output() onNavigateToPreAuditCalls = new EventEmitter<void>();
  @Output() onNavigateToTaskAssignment = new EventEmitter<void>();
  @Output() onNavigateToHelpDeskHistory = new EventEmitter<void>();

  activeSection = 'overview';

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
    
    const sections = ['overview', 'logging-process', 'information-requirements', 'system-usage', 'quality-assurance'];
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
    }
  }
}