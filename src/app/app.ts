import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService, PageType } from './services/navigation.service';
import { LandingPageComponent } from './components/landing-page.component';
import { HelpSupportPageComponent } from './components/help-support-page.component';
import { BulkAssignmentArticleComponent } from './components/bulk-assignment-article.component';
import { FooterComponent } from './components/footer.component';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    LandingPageComponent,
    HelpSupportPageComponent,
    BulkAssignmentArticleComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  currentPage: PageType = 'landing';

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.currentPage$.subscribe(page => {
      this.currentPage = page;
    });
  }

  handleNavigateToHelp() {
    this.navigationService.navigateToHelp();
  }

  handleNavigateToHome() {
    this.navigationService.navigateToHome();
  }

  handleNavigateToBulkAssignment() {
    this.navigationService.navigateToBulkAssignment();
  }
}
