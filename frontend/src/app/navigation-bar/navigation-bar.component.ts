import { Component, OnInit } from '@angular/core';
import {VariablesService} from '../variables.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  isLoggedIn = false;
  isAdmin = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private variables: VariablesService
  ) {
  }

  /**
   * initializes variables.
   */
  ngOnInit() {
    this.variables.checkLoginStatus();
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
    this.variables.getAdmin().subscribe(admin => this.isAdmin = admin);
  }

  /**
   * Sends a logout request to the backend.
   */
  logOut() {
    this.httpClient.get(this.variables.getUrl().concat('/logout'), {withCredentials: true}).subscribe(
      (object: any) => { this.variables.setAdminFalse(); this.variables.setLogin(false); this.router.navigate(['offers']); },
      (object: any) => { alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  /**
   *  Toggle between showing and hiding the navigation menu links when the user clicks on the bar icon
   */
  toggleFunction() {
    const x = document.getElementById('links');
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }
}
