// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app/app.component';
import { CurrencyConverterComponent } from '../app/components/currency-converter/currency-converter.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,              // Import standalone component instead of declaring it
    CurrencyConverterComponent // Import standalone component here as well
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
