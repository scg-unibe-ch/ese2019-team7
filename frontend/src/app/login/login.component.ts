import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../login-user';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private httpClient: HttpClient, private router: Router
  ) {
  }

  model = new LoginUser('', '');


  submitted = false;

  onSubmit() { this.submitted = true; }

  ngOnInit() {}

  onSave() {
    this.httpClient.put('http://localhost:3000/login', {
      username: this.model.username,
      password: this.model.password
    }, {withCredentials: true}).subscribe(
      (object) => this.router.navigate(['offers']),
      (object) => alert(object.status + ': ' + object.error.message));
  }
}
