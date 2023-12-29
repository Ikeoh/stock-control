import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { signupUserRequest } from '../../models/interface/user/signupUserRequest';
import { signupUserResponse } from '../../models/interface/user/signupUserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = enviroment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  signupUser(requestDatas: signupUserRequest): Observable<signupUserResponse> {
    return this.http.post<signupUserResponse>(
      `${}`
    )
  }
}
