import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  private isLoggedIn: BehaviorSubject<boolean>;
  private isAdmin: BehaviorSubject<boolean>;
  private baseUrl = 'http://localhost:3000';
  private categories = ['other', 'catering', 'entertainment', 'location', ''];



  constructor(
    private httpClient: HttpClient
  ) {
   this.isLoggedIn = new BehaviorSubject<boolean>(false);
   this.isAdmin = new BehaviorSubject<boolean>(false);
   this.checkLoginStatus();
  }

  getLogin(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  getAdmin(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }

  public setLogin(newBool: boolean) {
    this.isLoggedIn.next(newBool)
    if (this.isLoggedIn) {
      this.setAdmin();
    }
  }

  private setAdmin() {
    this.httpClient.get(this.baseUrl.concat('/adminProtected'), {withCredentials: true}).subscribe(
      (object: any) => {this.isAdmin.next(true); },
      (object: any) => {this.isAdmin.next(false); });
  }

  public setAdminFalse() {
    this.isAdmin.next(false);
  }

  private checkLoginStatus() {
    this.httpClient.get('http://localhost:3000/protected', {withCredentials: true}).subscribe(
      (object: any) => { this.setLogin(true); this.setAdmin(); },
      (object: any) => { this.setLogin(false); });
  }

  public getUrl(): string {
    return this.baseUrl;
  }

  public getCategories(): string[] {
    return this.categories;
}
}

