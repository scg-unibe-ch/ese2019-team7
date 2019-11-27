import { Component, OnInit } from '@angular/core';
import {RegistrationUser} from '../registration-user';
import {HttpClient} from '@angular/common/http';
import {VariablesService} from '../variables.service';
import {FunctionsService} from '../functions.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private variables: VariablesService,
    private functions: FunctionsService
  ) { }

  model = new RegistrationUser('', '', '', '');

  submitted = false;

  onSubmit() {this.submitted = true; }

  ngOnInit() {}

  /**
   * Sends a registration request to backend. Checks if user is logged in upon success.
   */
  onSave() {
    console.log(this.variables);
    this.httpClient.post(this.variables.getUrl().concat('/register'), {
      username: this.model.username,
      password: this.model.password1,
      email: this.model.email,
      tel: this.model.tel,
      address: this.model.address
    }, {withCredentials: true}).subscribe( (object: any) => {
      this.variables.checkLoginStatus();
      this.functions.answer(object); }, this.functions.onSave_error);
  }
}
