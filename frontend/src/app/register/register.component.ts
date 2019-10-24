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

  ngOnInit() {}

  onSave() {
    this.httpClient.post('http://localhost:3000/register', {
      username: this.model.username,
      password: this.model.password1,
      email: this.model.email,
      tel: this.model.tel,
      address: this.model.address
    }).subscribe( this.answer, this.onSave_error);
  }

  onSave_error(object: any) {
    alert(object.status + ': ' + object.error.message);
  }

  answer(object: any) {
    alert(object.message);
  }

  validTel(tel: any) {
    return (tel == null || tel.value === '' || (new RegExp('[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$').test(tel.value)));
  }
}
