import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Class } from '../models/class';
import { ClassAcount } from '../models/class-a';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private baseUrl = 'http://localhost:9002/api';
  constructor(private http: HttpClient) {}

  getClass(): Observable<Class[]> {
    return this.http
      .get<any>(`${this.baseUrl}/classes`)
      .pipe(map((response) => response.map((item: any) => new Class(item))));
  }
  addClassr(Class: ClassAcount): Observable<Class> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(Class);
    return this.http.post<Class>(`${this.baseUrl}/classes`, body, {
      headers: headers,
    });
  }
  deleteClass(ClassID: number): Observable<{}> {
    const headers = { 'content-type': 'application/json' };
    return this.http.delete(`${this.baseUrl}/classes/${ClassID}`, {
      headers: headers,
    });
  }
}
