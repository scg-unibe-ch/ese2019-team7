import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor() { }

  /*login() {
    this.login.post('http://localhost:3000/login', {
      name: this.login.name,
      password: this.login.password
    });
  }*/


  ngOnInit() {}

}
