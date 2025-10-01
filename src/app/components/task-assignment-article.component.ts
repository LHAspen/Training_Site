import { Component, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GlobalSearchComponent } from './global-search.component';
import { SearchResult } from '../services/search.service';

@Component({
  selector: 'app-task-assignment-article',
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
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect width="400" height="250" fill="rgba(255,255,255,0.1)" rx="8"/><g transform="translate(100,125)"><rect x="-15" y="-15" width="30" height="30" fill="rgba(255,255,255,0.3)" rx="4"/><line x1="15" y1="-15" x2="65" y2="-15" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="15" y1="0" x2="65" y2="0" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="15" y1="15" x2="65" y2="15" stroke="rgba(255,255,255,0.6)" stroke-width="2"/></g><g transform="translate(200,125)"><rect x="-15" y="-15" width="30" height="30" fill="rgba(255,255,255,0.3)" rx="4"/><line x1="15" y1="-15" x2="65" y2="-15" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="15" y1="0" x2="65" y2="0" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><line x1="15" y1="15" x2="65" y2="15" stroke="rgba(255,255,255,0.6)" stroke-width="2"/></g><text x="50%" y="80%" text-anchor="middle" font-family="BordBiaSans-Regular" font-size="12" fill="rgba(255,255,255,0.6)">Task Management System</text></svg>') no-repeat center center;
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
      text-decoration: none;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      display: block;
      padding: 8px 12px;
      border-radius: 6px;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
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
            <img src="./bord-bia-logo-green.svg" alt="Bord Bia - Irish Food Board" class="bord-bia-logo">
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
              <span class="breadcrumb-current">Task Assignment</span>
            </li>
          </ol>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Task Assignment</h1>
          <div class="hero-meta">
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>8 Minutes</span>
            </div>
            <div class="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>19/09/25</span>
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
              <a href="#overview" class="toc-link" [class.active]="activeSection === 'overview'" (click)="scrollToSection('overview')">
                Overview
              </a>
            </li>
            <li class="toc-item">
              <a href="#assignment-process" class="toc-link" [class.active]="activeSection === 'assignment-process'" (click)="scrollToSection('assignment-process')">
                Assignment Process
              </a>
            </li>
            <li class="toc-item">
              <a href="#task-types" class="toc-link" [class.active]="activeSection === 'task-types'" (click)="scrollToSection('task-types')">
                Task Types
              </a>
            </li>
            <li class="toc-item">
              <a href="#monitoring" class="toc-link" [class.active]="activeSection === 'monitoring'" (click)="scrollToSection('monitoring')">
                Monitoring & Tracking
              </a>
            </li>
            <li class="toc-item">
              <a href="#escalation" class="toc-link" [class.active]="activeSection === 'escalation'" (click)="scrollToSection('escalation')">
                Escalation Procedures
              </a>
            </li>
          </ul>
        </div>

        <!-- Main Article Content -->
        <div class="article-content">
          <h1 id="overview">Task Assignment Overview</h1>
          <p>
            Effective task assignment is crucial for maintaining audit workflow efficiency and ensuring 
            proper distribution of workload among team members. This process involves identifying, 
            categorizing, and allocating audit-related tasks to appropriate personnel based on their 
            expertise, availability, and current workload.
          </p>

          <div class="highlight-box">
            <p>
              <strong>Key Principle:</strong> Task assignment should balance workload distribution, 
              skill matching, and timeline requirements to optimize audit team performance and outcomes.
            </p>
          </div>

          <h2 id="assignment-process">Assignment Process</h2>
          <p>
            Follow this systematic approach to ensure tasks are assigned effectively and transparently:
          </p>

          <h3>Step 1: Task Analysis</h3>
          <ul>
            <li>Review task requirements and complexity level</li>
            <li>Identify required skills and experience</li>
            <li>Determine estimated completion time</li>
            <li>Assess priority level and dependencies</li>
            <li>Consider any special requirements or constraints</li>
          </ul>

          <h3>Step 2: Resource Assessment</h3>
          <ul>
            <li>Evaluate team member availability and current workload</li>
            <li>Match task requirements with individual competencies</li>
            <li>Consider development opportunities for team members</li>
            <li>Account for geographical and scheduling constraints</li>
          </ul>

          <h3>Step 3: Assignment Execution</h3>
          <ul>
            <li>Clearly communicate task objectives and expectations</li>
            <li>Provide necessary resources and documentation</li>
            <li>Set realistic deadlines and milestone checkpoints</li>
            <li>Establish communication protocols and reporting requirements</li>
            <li>Document the assignment in the task management system</li>
          </ul>

          <h2 id="task-types">Task Types and Categories</h2>
          <p>
            Understanding different task types helps ensure appropriate assignment and resource allocation:
          </p>

          <h3>Audit Preparation Tasks</h3>
          <ul>
            <li>Site information gathering and research</li>
            <li>Documentation review and analysis</li>
            <li>Scheduling coordination and logistics</li>
            <li>Team briefing and preparation materials</li>
          </ul>

          <h3>Audit Execution Tasks</h3>
          <ul>
            <li>On-site audit activities and observations</li>
            <li>Interview coordination and conduct</li>
            <li>Documentation verification and sampling</li>
            <li>Evidence collection and analysis</li>
          </ul>

          <div class="highlight-box">
            <p>
              <strong>Best Practice:</strong> Assign complementary tasks to team members to promote 
              knowledge sharing and ensure comprehensive audit coverage.
            </p>
          </div>

          <h3>Post-Audit Tasks</h3>
          <ul>
            <li>Report writing and review</li>
            <li>Finding documentation and evidence compilation</li>
            <li>Client communication and follow-up</li>
            <li>Quality assurance and file completion</li>
          </ul>

          <h2 id="monitoring">Monitoring and Tracking</h2>
          <p>
            Effective monitoring ensures tasks progress according to plan and allows for timely 
            interventions when needed:
          </p>

          <h3>Progress Tracking Methods</h3>
          <ul>
            <li>Regular check-in meetings and status updates</li>
            <li>Task management system monitoring and reporting</li>
            <li>Milestone-based progress assessments</li>
            <li>Quality checkpoints and deliverable reviews</li>
          </ul>

          <h3>Performance Indicators</h3>
          <ul>
            <li>Task completion rates and timeline adherence</li>
            <li>Quality metrics and error rates</li>
            <li>Resource utilization and efficiency measures</li>
            <li>Team member satisfaction and feedback</li>
          </ul>

          <h2 id="escalation">Escalation Procedures</h2>
          <p>
            Clear escalation procedures ensure issues are addressed promptly and appropriately:
          </p>

          <h3>When to Escalate</h3>
          <ul>
            <li>Tasks falling significantly behind schedule</li>
            <li>Quality issues or compliance concerns</li>
            <li>Resource conflicts or availability problems</li>
            <li>Technical difficulties or system issues</li>
            <li>Client relationship or communication challenges</li>
          </ul>

          <h3>Escalation Process</h3>
          <ul>
            <li>Immediate notification to direct supervisor or team lead</li>
            <li>Documentation of issue details and impact assessment</li>
            <li>Proposed solutions or recommendations for resolution</li>
            <li>Timeline for resolution and follow-up actions</li>
            <li>Communication to affected stakeholders as appropriate</li>
          </ul>

          <div class="highlight-box">
            <p>
              <strong>Remember:</strong> Early escalation of issues prevents minor problems from 
              becoming major obstacles to audit success and client satisfaction.
            </p>
          </div>
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
export class TaskAssignmentArticleComponent implements OnInit, OnDestroy {
  @Output() onNavigateToHome = new EventEmitter<void>();
  @Output() onNavigateToHelp = new EventEmitter<void>();
  @Output() onNavigateToBulkAssignment = new EventEmitter<void>();
  @Output() onNavigateToPreAuditCalls = new EventEmitter<void>();
  @Output() onNavigateToCallLogging = new EventEmitter<void>();

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

  private updateActiveSection() {
    const sections = ['overview', 'assignment-process', 'task-types', 'monitoring', 'escalation'];
    const scrollPosition = window.pageYOffset + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        this.activeSection = sections[i];
        break;
      }
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
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