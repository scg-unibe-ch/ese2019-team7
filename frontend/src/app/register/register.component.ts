import { Component, OnInit } from '@angular/core';
import {RegistrationUser} from '../registration-user';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(
    private httpClient: HttpClient
  ) { }

  model = new RegistrationUser('', '', '', '');

  submitted = false;

  onSubmit() {this.submitted = true; }

  newRegistrationUser() {
    this.model = new RegistrationUser('', '', '', '', 0, '');
  }

  ngOnInit() {}

  onSave() {
    this.httpClient.put('http://localhost:3000/login/' + this.model.username, {
      username: this.model.username,
      password: this.model.password1,
      email: this.model.email,
      tel: this.model.tel,
      address: this.model.address
    }).subscribe();
  }

}
