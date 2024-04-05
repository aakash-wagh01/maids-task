import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) {}

  getUsers(pageNo?: number, id?: number): Observable<any> {
    let url = this.baseUrl;
    if (pageNo) {
      url += `?page=${pageNo}`;
    } else if (id) {
      url += `?id=${id}`;
    }
    return this.http.get<any>(url);
  }
}
