import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cake } from '../models/cake.model';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';

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

  getOneCake(id: number): Observable<Cake> {
    return this.http.get<Cake>(`http://localhost:3000/api/cakes/${id}`).pipe(map((cake) => {
      console.log(cake);
      return cake;
    }));
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/api/user`).pipe(map((user) => {
      return user;
    }));
  }

  editUser(user: User): Observable<User> {
    console.log(user);
    return this.http.put<User>(`http://localhost:3000/api/user/${user._id}`, user).pipe(map((user) => {
      console.log(user);
      return user;
    }));
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`http://localhost:3000/api/messages`, message).pipe(map((m) => {
      console.log(m);
      return m;
    }));
  }
}
