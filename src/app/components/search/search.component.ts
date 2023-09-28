import { Component, Input } from '@angular/core';
import { ProductsComponent } from 'src/app/products/products.component';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: []
})
export class SearchComponent {

  params!: string;
  @Input() productsComponent!: ProductsComponent;


  constructor(private productsService: ProductsService){}

  search(){
    this.productsService.getProductsByParams(this.params)
    .subscribe((products: string[]) =>{
      this.productsComponent.setProducts(products);
    });
  }


}
