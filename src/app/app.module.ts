import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgFor } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CardsComponent } from './components/cards/cards.component';
import { FilterAvailabilityComponent } from './components/filter-availability/filter-availability.component';
import { FilterPriceComponent } from './components/filter-price/filter-price.component';
import { ProductsService } from './products/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchComponent } from './components/search/search.component';
import { ModalComponent } from './components/modal/modal.component';

/*

    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe, */
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    PageNotFoundComponent,
    CardsComponent,
    FilterAvailabilityComponent,
    FilterPriceComponent,
    SearchComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    NgFor
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
