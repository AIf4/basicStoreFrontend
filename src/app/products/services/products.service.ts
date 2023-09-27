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

  createProduct(createProduct: any, tags: string[]) {
    return this.getTagsByName(tags).subscribe((resultTags: any) => {
      let tagsId = resultTags.map((res: any) => res._id);
      createProduct.tags = tagsId;
      console.log(createProduct);
      this.http
        .post(`${this.apiUrl}/products`, createProduct)
        .subscribe((result: any) => console.log(result));
    });

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
    return this.http.get(`${this.apiUrl}/tags`).pipe(map((tag: any) => tag));
  }

  getTagsByName(tagsNames: string[]) {
    return this.http
      .post(`${this.apiUrl}/tags/by-name`, tagsNames)
      .pipe(map((tag: any) => tag));
  }
}
