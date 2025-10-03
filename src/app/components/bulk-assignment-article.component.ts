import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GlobalSearchComponent } from './global-search.component';
import { SearchResult } from '../services/search.service';

@Component({
  selector: 'app-bulk-assignment-article',
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
      color: #004b4e;
      background: none;
      border: none;
      text-decoration: none;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      padding: 8px 0;
      display: block;
      width: 100%;
      text-align: left;
      border-left: 3px solid transparent;
      padding-left: 12px;
      transition: all 0.2s ease;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }

    .toc-link:hover {
      color: #009077;
      border-left-color: #009077;
      background: rgba(0, 144, 119, 0.05);
    }

    .toc-link.active {
      color: #009077;
      border-left-color: #009077;
      background: rgba(0, 144, 119, 0.1);
      font-weight: 500;
    }

    .toc-link:focus {
      outline: 2px solid #009077;
      outline-offset: 2px;
    }

    /* Main Content Area */
    .main-content {
      background: white;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 0;
    }

    .content-section {
      margin-bottom: 40px;
    }

    .section-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 24px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 0 0 16px 0;
    }

    .content-text {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      margin-bottom: 16px;
    }

    .content-list {
      list-style: none;
      padding: 0;
      margin: 16px 0;
    }

    .content-list li {
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      margin-bottom: 8px;
      padding-left: 20px;
      position: relative;
    }

    .content-list li:before {
      content: '•';
      color: #009077;
      position: absolute;
      left: 0;
      font-weight: bold;
    }

    .screenshot-container {
      background: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }

    .screenshot-placeholder {
      width: 100%;
      height: 300px;
      background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                  linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                  linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                  linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 14px;
    }

    /* Related Content Sidebar */
    .related-sidebar {
      height: fit-content;
      position: sticky;
      top: 40px;
      margin-bottom: 0;
    }

    .related-content-wrapper {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .related-title {
      font-family: 'BordBiaSans-Bold', Arial, sans-serif;
      font-size: 18px;
      font-weight: bold;
      color: #1c4a4c;
      margin: 0 0 20px 0;
    }

    .related-cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      justify-items: center;
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

    /* Image Modal Styles */
    .image-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      padding: 20px;
      box-sizing: border-box;
    }

    .modal-content-image {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .modal-image {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .modal-caption {
      color: white;
      font-family: 'BordBiaSans-Regular', Arial, sans-serif;
      font-size: 16px;
      text-align: center;
      margin: 0;
    }

    .modal-close {
      position: absolute;
      top: -50px;
      right: 0;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.3s ease;
    }

    .modal-close:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .clickable-image {
      cursor: pointer;
      transition: opacity 0.3s ease;
    }

    .clickable-image:hover {
      opacity: 0.9;
    }

    @media (max-width: 1200px) {
      .content-layout {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .toc-sidebar, .related-sidebar {
        position: static;
      }

      .hero-section {
        flex-direction: column;
        gap: 30px;
        text-align: center;
      }

      .hero-image {
        margin-left: 0;
        max-width: 100%;
      }

      .hero-title {
        font-size: 36px;
      }
    }

    @media (max-width: 768px) {
      .header-container {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
      }

      .header-actions {
        width: 100%;
        justify-content: center;
      }

      .hero-title {
        font-size: 28px;
      }

      .article-content {
        padding: 20px;
      }
    }
  `],
  template: `
    <div class="article-page">
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-container">
          <img src="./bord-bia-logo-green.svg" alt="Bord Bia - Irish Food Board" class="bord-bia-logo" (click)="navigateToHome()" style="cursor: pointer;">
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
              <button class="breadcrumb-button" (click)="navigateToHelp()">
                FRS HelpDesk
              </button>
            </li>
            <li class="breadcrumb-item">
              <span class="breadcrumb-separator">></span>
            </li>
            <li class="breadcrumb-item">
              <span class="breadcrumb-current">Bulk Assignment of Auditors</span>
            </li>
          </ol>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Bulk Assignment of Auditors</h1>
          <div class="hero-meta">
            <div class="meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>9 Minutes</span>
            </div>
            <div class="meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
              </svg>
              <span>23/09/25</span>
            </div>
          </div>
        </div>
        <div class="hero-image hero-sheep">
          <img src="assets/Sheep.webp" alt="Bulk Assignment" />
        </div>
      </div>

      <!-- Main Content Layout -->
      <div class="content-layout">
        <!-- Table of Contents Sidebar -->
        <nav class="toc-sidebar">
          <h2 class="toc-title">Table of Contents</h2>
          <ul class="toc-list">
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'summary'" (click)="scrollToSection($event, 'summary')">Summary</button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'introduction'" (click)="scrollToSection($event, 'introduction')">Introduction</button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'bulk-assignment'" (click)="scrollToSection($event, 'bulk-assignment')">Bulk Assignment of Auditors</button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'more-information'" (click)="scrollToSection($event, 'more-information')">More Information</button>
            </li>
            <li class="toc-item">
              <button class="toc-link" [class.active]="activeSection === 'steps-to-bulk-assign'" (click)="scrollToSection($event, 'steps-to-bulk-assign')">Steps to Bulk Assign Auditors</button>
            </li>
          </ul>
        </nav>

        <!-- Main Content Area -->
        <main class="main-content">
          <!-- Summary Section -->
          <section id="summary" class="content-section">
            <h2 class="section-title">Summary</h2>
            <p class="content-text">
              Welcome to the "Bulk Assignment of Auditors" guide! This resource helps streamline your audit management by efficiently assigning auditors to previously unassigned audits. When automated systems can't find suitable auditors for exclusion reasons apply, you may face unnecessary delays.
            </p>
            <p class="content-text">
              In just three minutes, you'll learn a quick, step-by-step process to effectively allocate unassigned audits, from accessing your work list to confirming assignments. Use this guide to enhance your audit assignments and improve your overall workflow. Let's get started!
            </p>
          </section>

          <!-- Introduction Section -->
          <section id="introduction" class="content-section">
            <h2 class="section-title">Introduction</h2>
            <p class="content-text">
              Efficient audit management is crucial for timely processing. The "Bulk Assignment of Auditors" guide provides clear and concise instructions to assist you in assigning auditors to audits that may have been previously left unassigned due to automated assignment not finding suitable auditors or where there were exclusion reasons.
            </p>
            <p class="content-text">
              This process can help in minimizing delays, allowing audits to proceed without unnecessary hold-ups.
            </p>
            <p class="content-text">
              By leveraging this guide, you'll be able to assign auditors efficiently, ensuring that your audits are consistently managed and passed on to the right personnel as quickly as possible.
            </p>
          </section>

          <!-- Bulk Assignment Section -->
          <section id="bulk-assignment" class="content-section">
            <h2 class="section-title">Bulk Assignment of Auditors</h2>
            <p class="content-text">
              Efficiently allocate unassigned audits by utilizing bulk assignment for streamlined auditor placement. Follow steps to ensure timely audit management:
            </p>
            
            <div class="screenshot-container">
              <div class="screenshot-placeholder">
                 <img src="assets/Bulk-Dashboard.jpg" 
                      alt="Bulk Dashboard - Shows the interface for managing bulk auditor assignments" 
                      class="clickable-image"
                      (click)="openImageModal('assets/Bulk-Dashboard.jpg', 'Bulk Dashboard - Shows the interface for managing bulk auditor assignments')"
                      style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            </div>

            <ul class="content-list">
              <li>Navigate to the People Management section in your dashboard</li>
              <li>Select the appropriate audit category from the available options</li>
              <li>Review the list of unassigned audits requiring auditor allocation</li>
              <li>Use the bulk selection tools to choose multiple audits</li>
              <li>Assign qualified auditors based on expertise and availability</li>
              <li>Confirm assignments and set notification preferences</li>
            </ul>
          </section>

          <!-- More Information Section -->
          <section id="more-information" class="content-section">
            <h2 class="section-title">More Information</h2>
            <p class="content-text">
              For additional guidance on audit management processes, consider these related topics:
            </p>
            <ul class="content-list">
              <li>Understanding auditor qualifications and certifications</li>
              <li>Managing audit schedules and deadlines effectively</li>
              <li>Troubleshooting common assignment conflicts</li>
              <li>Setting up automated notification systems</li>
              <li>Best practices for audit quality assurance</li>
            </ul>
          </section>

          <!-- Steps Section -->
          <section id="steps-to-bulk-assign" class="content-section">
            <h2 class="section-title">Steps to Bulk Assign Auditors</h2>
            <p class="content-text">
              Follow this detailed step-by-step process to efficiently assign multiple auditors:
            </p>
            <ul class="content-list">
              <li>Access the Audit Management portal through your dashboard</li>
              <li>Navigate to the "Unassigned Audits" section</li>
              <li>Filter audits by type, date, or priority level as needed</li>
              <li>Select multiple audits using the checkbox selection tools</li>
              <li>Click "Bulk Assign" to open the assignment interface</li>
              <li>Choose qualified auditors from the available personnel list</li>
              <li>Set assignment dates and completion deadlines</li>
              <li>Configure notification settings for auditors and managers</li>
              <li>Review the assignment summary for accuracy</li>
              <li>Submit the bulk assignment for processing</li>
              <li>Monitor assignment status through the tracking dashboard</li>
            </ul>
          </section>
        </main>

        <!-- Related Content Sidebar -->
        <aside class="related-sidebar">
          <div class="related-content-wrapper">
            <h3 class="related-title">Related Content</h3>
            
            <div class="related-cards">
            <div class="content-card">
              <div class="card-image">
                <img src="assets/cow.webp" alt="Task Assignment" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="card-content">
                <h3 class="card-title">Task Assignment</h3>
                <div class="card-meta">
                  <div class="meta-item">
                    <svg class="meta-icon" viewBox="0 0 24 24">
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                      <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
                    </svg>
                    <span>8 Minutes</span>
                  </div>
                  <div class="meta-item">
                    <svg class="meta-icon" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>19/09/25</span>
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

            <div class="content-card">
              <div class="card-image">
                <img src="assets/frs-helpdesk-team.jpg" alt="Call Logging" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div class="card-content">
                <h3 class="card-title">Call Logging</h3>
                <div class="card-meta">
                  <div class="meta-item">
                    <svg class="meta-icon" viewBox="0 0 24 24">
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                      <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
                    </svg>
                    <span>6 Minutes</span>
                  </div>
                  <div class="meta-item">
                    <svg class="meta-icon" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>15/09/25</span>
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
          </div>
        </aside>
      </div>

      <!-- Image Modal -->
      <div *ngIf="showImageModal" class="image-modal" (click)="closeImageModal()">
        <div class="modal-content-image" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeImageModal()" aria-label="Close image modal">
            ×
          </button>
          <img [src]="modalImageSrc" [alt]="modalImageAlt" class="modal-image" />
          <p class="modal-caption">{{ modalImageAlt }}</p>
        </div>
      </div>
    </div>
  `
})
export class BulkAssignmentArticleComponent implements OnInit, OnDestroy {
  activeSection: string = 'summary';
  private sections: string[] = ['summary', 'introduction', 'bulk-assignment', 'more-information', 'steps-to-bulk-assign'];
  
  // Modal properties
  showImageModal = false;
  modalImageSrc = '';
  modalImageAlt = '';

  constructor(private router: Router) {}
  
  ngOnInit() {
    // Set initial active section
    this.updateActiveSection();
  }
  
  ngOnDestroy() {
    // Restore body scrolling if modal was open
    if (this.showImageModal) {
      document.body.style.overflow = 'auto';
    }
  }
  
  @HostListener('window:scroll')
  onWindowScroll() {
    this.updateActiveSection();
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
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 10);
    }
  }
  
  private lastScrollUpdate = 0;
  
  private updateActiveSection() {
    const now = Date.now();
    if (now - this.lastScrollUpdate < 100) {
      return; // Throttle updates to prevent rapid changes
    }
    this.lastScrollUpdate = now;
    
    const scrollPosition = window.scrollY + 100; // Offset for header
    
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(this.sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        if (this.activeSection !== this.sections[i]) {
          this.activeSection = this.sections[i];
        }
        break;
      }
    }
  }

  handleSearchResult(result: SearchResult) {
    // Handle navigation based on search result
    if (result.url === '/help-support') {
      this.router.navigate(['/help-support']);
    } else if (result.url === '/bulk-assignment') {
      // Stay on current page or scroll to relevant section
      console.log('Search result for bulk assignment:', result.title);
    }
    // Add more navigation cases as needed
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToHelp() {
    this.router.navigate(['/help-support']);
  }

  // Modal methods
  openImageModal(imageSrc: string, imageAlt: string) {
    this.modalImageSrc = imageSrc;
    this.modalImageAlt = imageAlt;
    this.showImageModal = true;
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeImageModal() {
    this.showImageModal = false;
    this.modalImageSrc = '';
    this.modalImageAlt = '';
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showImageModal) {
      this.closeImageModal();
    }
  }
}