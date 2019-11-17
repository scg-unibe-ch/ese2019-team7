import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../login-user';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {VariablesService} from '../variables.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private httpClient: HttpClient, private router: Router, private variables: VariablesService
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
      (object) => this.successfulLogin(object),
      (object) => alert(object.status + ': ' + object.error.message));
  }

  successfulLogin(object) {
    this.variables.setLogin(true);
    this.router.navigate(['offers']);
  }

}
