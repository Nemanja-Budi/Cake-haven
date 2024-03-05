import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cake } from '../models/cake.model';

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  constructor(private http: HttpClient) { }


  getAllCakes(params?: any): Observable<Cake[]> {
    let options = {}
    if (params) {
      options = {
        params: new HttpParams()
                  // .set('page', params.page || 1)
                  // .set('pageSize', params.pageSize || 9)
                  .set('sort', params.sort || "")
                  .set('sortDirection', params.sortDirection || "")
                  .set('filter', params.filter && JSON.stringify(params.filter) || "")
      }
    }
    return this.http.get<Cake[]>(`http://localhost:3000/api/cakes`,options).pipe(map((cake) => {
      console.log(cake);
      return cake;
    }));
  }

  getIngridients(): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/api/ingredients`).pipe(map((ingridient) => {
      console.log(ingridient);
      return ingridient;
    }));
  }

  onGetOneCake(id: number): Observable<Cake> {
    return this.http.get<Cake>(`http://localhost:3000/api/cakes/${id}`).pipe(map((cake) => {
      console.log(cake);
      return cake;
    }));
  }
}
