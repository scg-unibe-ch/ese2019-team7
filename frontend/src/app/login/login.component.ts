import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../login-user';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private httpClient: HttpClient
  ) { }

  model = new LoginUser('', '');


  submitted = false;

  onSubmit() { this.submitted = true; }

  ngOnInit() {}

  onSave() {
    this.httpClient.put('http://localhost:3000/login', {
      username: this.model.username,
      password: this.model.password
    }, {withCredentials: true}).subscribe( this.answer, this.onSave_error);
  }

  onSave_error(object: any) {
    alert(object.status + ': ' + object.error.message);
  }

  answer(object: any) {
    alert(object.message);
  }

}
