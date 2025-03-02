import { Component } from '@angular/core';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  imports: [
    CurrencyConverterComponent
  ],
  styleUrl: './app.component.scss',
  template: `
    <h1>Hello, currency-converter</h1>
    <!-- The router will place the CurrencyConverterComponent here -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'currency-converter';
}
