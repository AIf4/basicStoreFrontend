import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createTags(createTag: any): Observable<any> {
    console.log('entra', createTag);
    return this.http.post(`${this.apiUrl}/tags`, createTag).pipe(
      catchError((error) => {
        console.error('Se produjo un error:', error);

        return 'Valor alternativo en caso de error';
      })
    );
  }

  createProduct(createProduct: any) {
    return this.http
      .post(`${this.apiUrl}/products`, createProduct)
      .pipe(map((products: any) => products));
  }

  getProductsByRangePrice(min: number, max:number) {
    return this.http
      .get(`${this.apiUrl}/products/by-price-range/${min}/${max}`)
      .pipe(map((products: any) => products));
  }

  getProductsByParams(params: string) {
    if(!params) return this.getAllProducts();
    return this.http
      .get(`${this.apiUrl}/products/by-params/${params}`)
      .pipe(map((products: any) => products));
  }

  getTagProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getAllProducts() {
    return this.http
      .get(`${this.apiUrl}/products`)
      .pipe(map((products: any) => products));
  }

  getAllTags() {
    return this.http
      .get(`${this.apiUrl}/tags`)
      .pipe(map((tag: any) => tag.map((tag: any) => tag.name)));
  }

  getTagsByName(tagsNames: string[]) {
    return this.http
      .post(`${this.apiUrl}/tags/by-name`, tagsNames)
      .pipe(map((tag: any) => tag.map((res: any) => res._id)));
  }

  removeProduct(id: string){
    return this.http
      .delete(`${this.apiUrl}/products/${id}`);
  }
}
