import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferCreationForm} from '../offerCreationForm';

@Component({
  selector: 'app-offer-creation-form',
  templateUrl: './offer-creation-form.component.html',
  styleUrls: ['./offer-creation-form.component.scss'],
})
export class OfferCreationFormComponent implements OnInit {

  constructor(    private httpClient: HttpClient
  ) {
  }

  model = new OfferCreationForm('', '', null, '', 0, 0);

  categories = ['other', 'catering', 'entertainment', 'location'];

  isLoggedIn = false;

  ngOnInit() {
    this.getMessage();
  }

  getMessage() {
    this.httpClient.get('http://localhost:3000/protected', {withCredentials: true}).subscribe(
      (object: any) => { this.isLoggedIn = true; },
      (object: any) => { this.isLoggedIn = false; });
  }

  onSubmit() { }

  onSave() {
    this.model.dateFrom = this.checkDate(this.model.dateFrom);
    this.model.dateTo = this.checkDate(this.model.dateTo);
    this.httpClient.post('http://localhost:3000/offers/create', {
      title: this.model.title,
      description: this.model.description,
      price: this.model.price,
      category: this.model.category,
      dateFrom: this.model.dateFrom,
      dateTo: this.model.dateTo,
    }, {withCredentials: true}).subscribe( this.answer, this.onSave_error);
  }

  checkDate(date: number) {
    if (date === 0) {
      return null;
    } else {
      return date;
    }
  }

  onSave_error(object: any) {
    alert(object.status + ': ' + object.error.message);
  }

  answer(object: any) {
    alert(object.message);
  }
}
