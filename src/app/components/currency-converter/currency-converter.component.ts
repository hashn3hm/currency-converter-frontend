import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

interface ConversionRecord {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
  date: Date;
}

@Component({
  selector: 'app-currency-converter',
  imports: [],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent implements OnInit {
  currencies: string[] = [];
  selectedFrom = '';
  selectedTo = '';
  amount: number = 0;
  result: number | null = null;
  loading = false;
  conversionHistory: ConversionRecord[] = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loadCurrencies();
    this.loadHistory();
  }

  loadCurrencies(): void {
    this.currencyService.getCurrencies().subscribe(response => {
      // Assume the API response contains a data object with a currencies field
      this.currencies = Object.keys(response.data.currencies);
    });
  }

  convert(): void {
    if (!this.selectedFrom || !this.selectedTo || !this.amount) {
      return;
    }
    this.loading = true;
    this.currencyService.convertCurrency(this.selectedFrom, this.selectedTo, this.amount)
      .subscribe(response => {
        this.result = response.convertedAmount;
        this.loading = false;
        const record: ConversionRecord = {
          from: this.selectedFrom,
          to: this.selectedTo,
          amount: this.amount,
          convertedAmount: response.convertedAmount,
          date: new Date()
        };
        this.conversionHistory.push(record);
        this.saveHistory();
      }, error => {
        this.loading = false;
        console.error(error);
      });
  }

  saveHistory(): void {
    localStorage.setItem('conversionHistory', JSON.stringify(this.conversionHistory));
  }

  loadHistory(): void {
    const history = localStorage.getItem('conversionHistory');
    if (history) {
      this.conversionHistory = JSON.parse(history);
    }
  }
}
