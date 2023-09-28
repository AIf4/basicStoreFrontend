import { Component, Input } from '@angular/core';
import { CardsComponent } from '../cards/cards.component';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: []
})
export class PaginateComponent {



  productsPerPage: number = 9;
  totalPages!: number;
  page: number = 1;
  firstPage!: number;
  lastpage!: number;

  @Input() products: any[] = [];


  constructor(){
    //this.totalPages = Math.ceil(this.products.length / this.productsPerPage);
    //this.products = this.cardsComponent.products

  }

  ngOnInit(): void {
    //this.mostrarProductosDePagina()
    console.log(this.products)

  }

  ngAfterViewInit() {
    //console.log(this.cardsComponent.products)
    console.log(this.products)
  }

  mostrarProductosDePagina() {
    console.log("entra")
    return;
    // Calculamos el índice inicial y final de los productos a mostrar en esta página
    this.firstPage = (this.page - 1) * this.productsPerPage;
    this.lastpage =  this.firstPage + this.productsPerPage;

    // Obtenemos los productos de la página actual
    //this.cardsComponent.products = this.products.slice(this.firstPage, this.lastpage);


  }

}
