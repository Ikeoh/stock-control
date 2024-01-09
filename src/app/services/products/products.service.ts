import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';
import { deleteProductResponse } from '../../models/interface/products/response/deleteProductResponse';
import { getAllProductsResponse } from '../../models/interface/products/response/getAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL = enviroment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
  ) { }

  getAllProducts(): Observable<Array<getAllProductsResponse>> {
    return this.http.get<Array<getAllProductsResponse>>(
      `${this.API_URL}/products`,
      this.httpOptions
    )
      .pipe(map((product) => product.filter((data) => data?.amount > 0)))
  }

  deleteProduct(product_id: string): Observable<deleteProductResponse> {
    return this.http.delete<deleteProductResponse>(
      `${this.API_URL}/product/delete`,
      {
        ...this.httpOptions,
        params: {
          product_id: product_id,
        }
      }
    )
  }
}
