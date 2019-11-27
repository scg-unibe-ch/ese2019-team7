import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

/**
 * Stores variables used globally.
 */

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  private readonly isLoggedIn: BehaviorSubject<boolean>; // true if the user is logged in, false otherwise
  private isAdmin: BehaviorSubject<boolean>; // true if the user is an admin, false otherwise
  private baseUrl = 'http://localhost:3000'; // the url of the backend
  private categories = ['other', 'catering', 'entertainment', 'location', '']; // all possible categories an offer can have.



  constructor(
    private httpClient: HttpClient
  ) {
   this.isLoggedIn = new BehaviorSubject<boolean>(false);
   this.isAdmin = new BehaviorSubject<boolean>(false);
   this.checkLoginStatus();
  }

  /**
   * returns an observable on the variable if the user is logged in.
   */
  getLogin(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  /**
   * returns an observable on the variable if the user is an admin.
   */

  getAdmin(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }

  /**
   * Changes the login variable, then checks if the admin variable needs to be changed.
   */
  public setLogin(newBool: boolean) {
    this.isLoggedIn.next(newBool);
    this.setAdmin();
  }

  /**
   * Checks if the  logged in user is an admin, changes the variable accordingly.
   */
  private setAdmin() {
    this.httpClient.get(this.baseUrl.concat('/adminProtected'), {withCredentials: true}).subscribe(
      (object: any) => {this.isAdmin.next(true); },
      (object: any) => {this.isAdmin.next(false); });
  }

  /**
   * Sets the admin variable to false. Note that there is no direct way to set it to true for security purpose, even if this only pertains
   * to visibility of components and buttons and not their function.
   */
  public setAdminFalse() {
    this.isAdmin.next(false);
  }

  /**
   * Checks if the user is logged in, changes the variable accordingly
   */
  public checkLoginStatus() {
    this.httpClient.get('http://localhost:3000/protected', {withCredentials: true}).subscribe(
      (object: any) => { this.setLogin(true); this.setAdmin(); },
      (object: any) => { this.setLogin(false); });
  }

  /**
   * Returns the url of the backend.
   */
  public getUrl(): string {
    return this.baseUrl;
  }

  /**
   * Returns the array of all categories.
   */
  public getCategories(): string[] {
    return this.categories;
}
}

