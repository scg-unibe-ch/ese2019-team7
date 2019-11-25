import { Component, OnInit } from '@angular/core';
import {RegistrationUser} from '../registration-user';
import {HttpClient} from '@angular/common/http';
import {VariablesService} from '../variables.service';
import {Router} from '@angular/router';


@Component({
  selector: 'changeUserData',
  templateUrl: './change-user-data.component.html',
  styleUrls: ['./change-user-data.component.scss'],
})
export class ChangeUserDataComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private variables: VariablesService,
    private router: Router
  ) { }

  model = new RegistrationUser('', '', '', '');

  submitted = false;
  isLoggedIn: boolean;
  deleting: boolean;
  passwordOld = '';
  onSubmit() {this.submitted = true; }

  ngOnInit() {
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
    this.httpClient.get(this.variables.getUrl().concat('/user'), {withCredentials: true}).subscribe(
      (instance: any) => this.model = new RegistrationUser(instance.name, '', '', instance.email, instance.phone, instance.address),
      (object: any) => {  alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  onSave() {
    this.httpClient.put(this.variables.getUrl().concat('/user/edit'), {
      email: this.model.email,
      phone: this.model.tel,
      address: this.model.address
    }, {withCredentials: true}).subscribe( this.answer, this.onSave_error);
  }

  onChangePassword() {
    this.httpClient.put(this.variables.getUrl().concat('/user/changePassword'), {
      password: this.passwordOld,
      passwordNew: this.model.password1,
    }, {withCredentials: true}).subscribe( this.answer, this.onSave_error);
  }

  onDelete() {
    this.httpClient.delete(this.variables.getUrl().concat('/user'),
      {withCredentials: true}).subscribe((object: any) => this.answerDelete(object), this.onSave_error);
  }


  onSave_error(object: any) {
    alert(object.status + ': ' + object.error.message);
  }

  answerDelete(object: any) {
    this.variables.setAdminFalse();
    this.variables.setLogin(false);
    this.answer(object);
    this.router.navigate(['offers']);
  }

  answer(object: any) {
    alert(object.message);
  }

  validTel(tel: any) {
    return (tel == null || tel.value === '' || (new RegExp('[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$').test(tel.value)));
  }
}
