import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  styles: [`
    .footer {
      background: white;
      padding: 20px 0;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 40px;
      padding: 0 24px;
    }
    
    .footer-logo {
      height: 28px;
      width: auto;
    }
    
    .footer-copyright {
      color: #383435;
      font-size: 14px;
      font-family: 'BordBiaSans', sans-serif;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }
  `],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <img src="assets/Logo.svg" alt="Aspen Grove Solutions" class="footer-logo">
        <div class="footer-copyright">
          Copyright © 2025 Aspen Grove Solutions and its Affiliates. All Rights Reserved.
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
