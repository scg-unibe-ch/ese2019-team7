import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  private isLoggedIn: BehaviorSubject<boolean>;

  constructor(
    private httpClient: HttpClient
  ) {
   this.isLoggedIn = new BehaviorSubject<boolean>(false);
   this.checkLoginStatus();
  }

  getLogin(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public setLogin(newBool: boolean) {
    this.isLoggedIn.next(newBool);
  }

  checkLoginStatus() {
    this.httpClient.get('http://localhost:3000/protected', {withCredentials: true}).subscribe(
      (object: any) => { this.setLogin(true); },
      (object: any) => { this.setLogin(false); });
  }
}

