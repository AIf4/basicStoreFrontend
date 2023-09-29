import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ProductsComponent } from 'src/app/products/products.component';
import { ProductsService } from 'src/app/products/services/products.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: [],
})
export class CardsComponent {

  @Input() productsComponent!: ProductsComponent;
  @Input() products: any[] = [];
  @Output() sentData = new EventEmitter<any>();

  constructor(private productsService: ProductsService){}

  editProduct(product: {}) {
    this.sentData.emit(product);
  }

  deleteProduct(producId: string){
    console.log(producId)
    this.productsService.removeProduct(producId)
    .subscribe(res => {
      this.productsComponent.getAllProducts()
    })
  }

}
