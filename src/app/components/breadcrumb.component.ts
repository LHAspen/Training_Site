import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  current?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  styles: [`
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
      width: 1rem;
      height: 1rem;
      margin: 0 4px;
    }
  `],
  template: `
    <nav class="breadcrumb-nav">
      <div class="breadcrumb-container">
        <ol class="breadcrumb-list">
          <ng-container *ngFor="let item of items; let last = last">
            <li class="breadcrumb-item">
              <button 
                *ngIf="!item.current && item.onClick" 
                (click)="item.onClick!()"
                class="breadcrumb-button">
                {{ item.label }}
              </button>
              <span *ngIf="item.current || !item.onClick" 
                    class="breadcrumb-current">
                {{ item.label }}
              </span>
            </li>
            <li *ngIf="!last" class="breadcrumb-item">
              <span class="breadcrumb-separator">></span>
            </li>
          </ng-container>
        </ol>
      </div>
    </nav>
  `
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}