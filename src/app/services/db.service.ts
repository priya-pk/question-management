import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient } from "@angular/common/http";
import { map, mapTo, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DbService {

  public questUrl = `http://localhost:5000/api/quest`;

  constructor(private http: HttpClient) { }

  public getAll(key,doc): Observable<any | boolean> {
    return this.http.get(`${this.questUrl}`,doc).pipe(
      map((value: any) => {
        return value;
      }),
      catchError((error: any) => {
        return error;
      })
    );
  }
  public get(id: any): Observable<any | boolean> {
    return this.http.get(`${this.questUrl}/${id}`).pipe(
      map((value: any) => {
        return value;
      }),
      catchError((error: any) => {
        return error;
      })
    )
  }
  public create(data: any): Observable<any | boolean> {
    return this.http.post(`${this.questUrl}`, data).pipe(
      mapTo(true),
      catchError((error: any) => {
        return error;
      })
    );
  }
  public remove(id: any): Observable<any | boolean> {
    return this.http.delete(`${this.questUrl}/${id}`).pipe(
      mapTo(true),
      catchError((error: any) => {
        return error;
      })
    );
  }
  public update(data): Observable<any | boolean> {
    return this.http.put(`${this.questUrl}`,data).pipe(
      mapTo(true),
      catchError((error: any) => {
        return error;
      })
    );
  }
}
