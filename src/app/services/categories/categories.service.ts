import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { enviroment } from '../../../enviroments/enviroment';
import { getCategoriesResponse } from '../../models/interface/categories/responses/getCategoriesResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = enviroment.API_URL
  private JWT_TOKEN = this.cookie.get('USER_INFO')
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application;json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
  }

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  getAllCategories(): Observable<Array<getCategoriesResponse>> {
    return this.http.get<Array<getCategoriesResponse>>(
      `${this.API_URL}/categories`,
      this.httpOptions
    )
  }

  createNewCategory(requestDatas: { name: string }): Observable<Array<getCategoriesResponse>> {
    return this.http.post<Array<getCategoriesResponse>>(
      `${this.API_URL}/category`,
      requestDatas,
      this.httpOptions
    )
  }

  deleteCategory(requestDatas: { category_id: string }): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/category/delete`, {
      ...this.httpOptions,
      params: {
        category_id: requestDatas.category_id,
      },
    });
  }

  editCategoryName(requestDatas: {
    name: string;
    category_id: string;
  }): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/category/edit`,
      { name: requestDatas.name },
      {
        ...this.httpOptions,
        params: {
          category_id: requestDatas.category_id,
        },
      }
    );
  }
}
