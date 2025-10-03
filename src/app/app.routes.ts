import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page.component';
import { HelpSupportPageComponent } from './components/help-support-page.component';
import { BulkAssignmentArticleComponent } from './components/bulk-assignment-article.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'help-support', component: HelpSupportPageComponent },
  { path: 'bulk-assignment', component: BulkAssignmentArticleComponent },
  { path: '**', redirectTo: '' } // Wildcard route for 404s
];
