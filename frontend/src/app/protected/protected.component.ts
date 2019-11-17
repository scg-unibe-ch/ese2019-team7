import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {VariablesService} from '../variables.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss'],
})
export class ProtectedComponent implements OnInit {

  welcomeMessage = '';
// /home/jeremie/WebstormProjects/ese2019-team7/frontend/www/svg/md-information-circle-outline.svg

  constructor(private httpClient: HttpClient, private router: Router, private variables: VariablesService) {
  }

  ngOnInit() {
    this.getMessage();
  }

  getMessage() {
    this.httpClient.get('http://localhost:3000/protected', {withCredentials: true}).subscribe(
      (object: any) => { this.welcomeMessage = object.message; },
      (object: any) => { this.welcomeMessage = 'HTTP Error ' + object.status + ': ' + object.error.message; });
  }

  logOut() {
    this.httpClient.get('http://localhost:3000/logout', {withCredentials: true}).subscribe(
      (object: any) => { this.variables.setLogin(false); this.router.navigate(['']); },
      (object: any) => { this.welcomeMessage = 'HTTP Error ' + object.status + ': ' + object.error.message; });
  }

}
