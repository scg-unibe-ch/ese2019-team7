import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../login-user';
import {HttpClient} from '@angular/common/http';
import {RegistrationUser} from '../registration-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private httpClient: HttpClient
  ) { }

  model = new LoginUser('foo', 'bar');


  submitted = false;

  onSubmit() {this.submitted = true;}

  newLoginUser() {
    this.model = new LoginUser('', '');
  }

  ngOnInit() {}

  onSave() {
    this.httpClient.put('http://localhost:3000/login/' + this.model.username, this.model).subscribe();
  }

}
