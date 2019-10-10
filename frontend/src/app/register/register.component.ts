import { Component, OnInit } from '@angular/core';
import {RegistrationUser} from '../registration-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor() { }

  model = new RegistrationUser(0, 'foo', 'bar', 'bar', 'foo@bar.com');

  submitted = false;

  onSubmit() {this.submitted = true;}

  newRegistrationUser() {
    this.model = new RegistrationUser(42, '', '', '', '', 0, '');
  }

  ngOnInit() {}

}
