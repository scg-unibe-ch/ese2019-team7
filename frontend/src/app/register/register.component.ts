import { Component, OnInit } from '@angular/core';
import {RegistrationUser} from '../registration-user';
import {HttpClient} from '@angular/common/http';
import {VariablesService} from '../variables.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private variables: VariablesService
  ) { }

  model = new RegistrationUser('', '', '', '');

  submitted = false;

  onSubmit() {this.submitted = true; }

  ngOnInit() {}

  onSave() {
    console.log(this.variables);
    this.httpClient.post(this.variables.getUrl().concat('/register'), {
      username: this.model.username,
      password: this.model.password1,
      email: this.model.email,
      tel: this.model.tel,
      address: this.model.address
    }, {withCredentials: true}).subscribe( (object: any) => this.answer(object, this.variables), this.onSave_error);
  }

  onSave_error(object: any) {
    alert(object.status + ': ' + object.error.message);
  }

  answer(object: any, variables: VariablesService) {
    variables.checkLoginStatus();
    alert(object.message);
  }

  validTel(tel: any) {
    return (tel == null || tel.value === '' || (new RegExp('[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$').test(tel.value)));
  }
}
