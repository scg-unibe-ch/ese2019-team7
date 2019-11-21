import { Component, OnInit } from '@angular/core';
import {RegistrationUser} from '../registration-user';
import {HttpClient} from '@angular/common/http';
import {VariablesService} from '../variables.service';


@Component({
  selector: 'changeUserData',
  templateUrl: './change-user-data.component.html',
  styleUrls: ['./change-user-data.component.scss'],
})
export class ChangeUserDataComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private variables: VariablesService
  ) { }

  model = new RegistrationUser('', '', '', '');

  submitted = false;
  isLoggedIn: boolean;
  onSubmit() {this.submitted = true; }

  ngOnInit() {
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
    this.httpClient.get(this.variables.getUrl().concat('/userData'), {withCredentials: true}).subscribe(
      (instance: any) => this.model = new RegistrationUser(instance.username, '', '', instance.email, instance.tel, instance.address),
      (object: any) => {  alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  onSave() {
    this.httpClient.post(this.variables.getUrl().concat('/changeUserData'), {
      username: this.model.username,
      email: this.model.email,
      tel: this.model.tel,
      address: this.model.address
    }).subscribe( this.answer, this.onSave_error);
  }

  onChangePassword() {
    this.httpClient.post(this.variables.getUrl().concat('/changePassword'), {
      password: this.model.password1,
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
