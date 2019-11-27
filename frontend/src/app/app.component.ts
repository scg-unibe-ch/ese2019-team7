import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {VariablesService} from './variables.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  isLoggedIn = false;
  isAdmin = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
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

}
