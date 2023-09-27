import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';
import { initFlowbite } from 'flowbite';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any;
  productForm!: FormGroup;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    initFlowbite();
  }

  getAllProducts(): void {
    this.productsService
      .getAllProducts()
      .subscribe((products) => (this.products = products));
  }
}
