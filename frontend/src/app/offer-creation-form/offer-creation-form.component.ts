import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferCreationForm} from '../offerCreationForm';
import { VariablesService } from '../variables.service';

@Component({
  selector: 'app-offer-creation-form',
  templateUrl: './offer-creation-form.component.html',
  styleUrls: ['./offer-creation-form.component.scss'],
})
export class OfferCreationFormComponent implements OnInit {

  constructor(    private httpClient: HttpClient,
                  private variables: VariablesService
  ) {
  }

  model = new OfferCreationForm('', '', null, '', null, null);

  categories: string[];
  isLoggedIn: boolean;
  showClear = false;

  ngOnInit() {
    this.categories = this.variables.getCategories();
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
  }

  onSubmit() { }

  onSave() {
    this.model.dateFrom = this.checkDate(this.model.dateFrom);
    this.model.dateTo = this.checkDate(this.model.dateTo);
    if (this.model.dateFrom !== null && this.model.dateTo !== null && this.model.dateFrom > this.model.dateTo) {
      alert('Your end date ist before your start date. Please fix this before continuing');
    } else {
      this.httpClient.post(this.variables.getUrl().concat('/offers/create'), {
        title: this.model.title,
        description: this.model.description,
        price: this.model.price,
        category: this.model.category,
        dateFrom: this.model.dateFrom,
        dateTo: this.model.dateTo,
      }, {withCredentials: true}).subscribe(this.answer, this.onSave_error);
      const resetForm = document.getElementById('offerCreationForm') as HTMLFormElement;
      resetForm.reset();
    }
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
