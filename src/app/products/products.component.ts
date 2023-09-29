import { Component, ViewChild } from '@angular/core';
import { ProductsService } from './services/products.service';
import { initFlowbite } from 'flowbite';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any;
  productForm!: FormGroup;
  productEdit!: {};

  public productsComponent = this;

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
    initFlowbite();
  }

  setProducts(products: string[]){
    this.products = products;
  }

  getAllProducts(): void {
    this.productsService
      .getAllProducts()
      .subscribe((products) => (this.products = products));
  }

  reciveDataFromCards(productsEdit: {}) {
    console.log(productsEdit)
    this.productEdit = productsEdit;
    this.modalComponent.editModal = true;
    this.modalComponent.modal.show()
  }
}
