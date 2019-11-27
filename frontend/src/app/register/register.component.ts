import { Component, OnInit } from '@angular/core';
import {RegistrationUser} from '../registration-user';
import {HttpClient} from '@angular/common/http';
import {VariablesService} from '../variables.service';
import {FunctionsService} from '../functions.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private variables: VariablesService,
    private functions: FunctionsService,
    private router: Router
  ) { }

  model = new RegistrationUser('', '', '', '');

  submitted = false;
  isLoggedIn = false;

  onSubmit() {this.submitted = true; }

  ngOnInit() {
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
  }

  /**
   * Sends a registration request to backend. Checks if user is logged in upon success,
   * and if he was not logged in before redirects him to the offers page.
   */
  onSave() {
    this.httpClient.post(this.variables.getUrl().concat('/register'), {
      username: this.model.username,
      password: this.model.password1,
      email: this.model.email,
      tel: this.model.tel,
      address: this.model.address
    }, {withCredentials: true}).subscribe( (object: any) => { if (!this.isLoggedIn) {
      this.router.navigate(['offers']);
    }
                                                              this.variables.checkLoginStatus();
                                                              alert('registration complete'); },
      this.functions.onSave_error);
  }
}
