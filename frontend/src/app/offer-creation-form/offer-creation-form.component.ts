import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {OfferCreationForm} from '../offerCreationForm';


@Component({
  selector: 'app-offer-creation-form',
  templateUrl: './offer-creation-form.component.html',
  styleUrls: ['./offer-creation-form.component.scss'],
})
export class OfferCreationFormComponent implements OnInit {

  constructor(    private httpClient: HttpClient, private router: Router
  ) {
  }

  model = new OfferCreationForm('', '');

  isLoggedIn = false;
  submitted = false;

  ngOnInit() {
    this.getMessage();
  }

  getMessage() {
    this.httpClient.get('http://localhost:3000/protected', {withCredentials: true}).subscribe(
      (object: any) => { this.isLoggedIn = true; },
      (object: any) => { this.isLoggedIn = false; });
  }

  onSubmit() {this.submitted = true; }

  onSave() {
    this.httpClient.post('http://localhost:3000/createOffer', {
      title: this.model.title,
      password: this.model.description,
    }).subscribe( this.answer, this.onSave_error);
  }

  onSave_error(object: any) {
    alert(object.status + ': ' + object.error.message);
  }

  answer(object: any) {
    alert(object.message);
  }
}
