import { Component, Input } from '@angular/core';
import { ProductsComponent } from 'src/app/products/products.component';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-filter-price',
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter-price.component.css']
})
export class FilterPriceComponent {
  min: number = 0 ;
  max: number = 0;
  @Input() productsComponent!: ProductsComponent;


  constructor(private productsService: ProductsService){}

  filterByPrice(){
    this.productsService.getProductsByRangePrice(this.min, this.max)
    .subscribe((products: string[]) =>{
      this.productsComponent.setProducts(products);
    });
  }

  resetPrice(){
    this.min = 0;
    this.max = 0;
    this.productsComponent.getAllProducts();
  }

}
