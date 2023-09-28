import { Component, Input, ViewChild } from '@angular/core';
import { ProductsComponent } from 'src/app/products/products.component';
import { ProductsService } from 'src/app/products/services/products.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: [],
})
export class CardsComponent {

  @Input() products: any[] = [];
  @Input() productsComponent!: ProductsComponent;

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  flatEdit!: boolean;
  productEdit!: {};


  constructor(private productsService: ProductsService){}

  ngOnInit() {

  }

  editProduct(produc: []){
    console.log(produc)
    this.flatEdit = true;
    /* this.productsService.editProduct(produc)
    .subscribe(res => {
      this.productsComponent.getAllProducts()
    }) */
  }

  deleteProduct(producId: string){
    console.log(producId)
    this.productsService.removeProduct(producId)
    .subscribe(res => {
      this.productsComponent.getAllProducts()
    })
  }

}
