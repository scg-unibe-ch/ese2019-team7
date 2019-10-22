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

  data = new Object('{ "message": "failed"}');

  onSubmit() {this.submitted = true; }

  ngOnInit() {}

  onSave() {
    this.httpClient.post('http://localhost:3000/register', {
      username: this.model.username,
      password: this.model.password1,
      email: this.model.email,
      tel: this.model.tel,
      address: this.model.address
    }).subscribe( message => this.answer(message), (err: any) => console.log(err));
  }

  answer(object: any) {
    this.data = JSON.parse(object);
    alert(this.data);
  }
}
