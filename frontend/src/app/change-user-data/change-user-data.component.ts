import { Component, OnInit } from '@angular/core';
import {RegistrationUser} from '../registration-user';
import {HttpClient} from '@angular/common/http';
import {VariablesService} from '../variables.service';
import {Router} from '@angular/router';
import {FunctionsService} from '../functions.service';


@Component({
  selector: 'changeUserData',
  templateUrl: './change-user-data.component.html',
  styleUrls: ['./change-user-data.component.scss'],
})
export class ChangeUserDataComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private variables: VariablesService,
    private router: Router,
    private functions: FunctionsService
  ) { }

  model = new RegistrationUser('', '', '', '');

  submitted = false;
  isLoggedIn: boolean;
  deleting: boolean;
  passwordOld = '';
  onSubmit() {this.submitted = true; }

  /**
   * checks login status, then gets user data from backend.
   */
  ngOnInit() {
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
    this.httpClient.get(this.variables.getUrl().concat('/user'), {withCredentials: true}).subscribe(
      (instance: any) => this.model = new RegistrationUser(instance.name, '', '', instance.email, instance.phone, instance.address),
      (object: any) => {  alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  /**
   * sends an edit request to backend
   */
  onSave() {
    this.httpClient.put(this.variables.getUrl().concat('/user/edit'), {
      email: this.model.email,
      phone: this.model.tel,
      address: this.model.address
    }, {withCredentials: true}).subscribe( this.functions.answer, this.functions.onSave_error);
  }

  /**
   * Sends a password change request to backend.
   */
  onChangePassword() {
    this.httpClient.put(this.variables.getUrl().concat('/user/changePassword'), {
      password: this.passwordOld,
      passwordNew: this.model.password1,
    }, {withCredentials: true}).subscribe( this.functions.answer, this.functions.onSave_error);
  }

  /**
   * sends a delete request to backend, calls other events triggered in frontend by account being disabled.
   * Note that this function assumes that a logout will be handled by the backend.
   */
  onDelete() {
    this.httpClient.delete(this.variables.getUrl().concat('/user'),
      {withCredentials: true}).subscribe((object: any) => this.answerDelete(object), this.functions.onSave_error);
  }

  /**
   * Changes variables that need to be updated on an account being deleted.
   * @param object doesn't really matter, will only be alerted
   */
  answerDelete(object: any) {
    this.variables.setAdminFalse();
    this.variables.setLogin(false);
    this.functions.answer(object);
    this.router.navigate(['offers']);
  }
}
