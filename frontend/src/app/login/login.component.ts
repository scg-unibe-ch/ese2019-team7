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

  data;

  onSubmit() { this.submitted = true; }

  ngOnInit() {}

  onSave() {
    this.httpClient.put('http://localhost:3000/login', {
      username: this.model.username,
      password: this.model.password
    }).subscribe((data: Component[]) => this.data = data, (err: any) => console.log(err));
  }

}
