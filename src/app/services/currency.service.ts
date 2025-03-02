import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ConversionResponse {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private baseUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/convert`);
  }

  convertCurrency(from: string, to: string, amount: number): Observable<ConversionResponse> {
    return this.http.get<ConversionResponse>(`${this.baseUrl}/convert`, {
      params: {
        from,
        to,
        amount: amount.toString()
      }
    });
  }
}
