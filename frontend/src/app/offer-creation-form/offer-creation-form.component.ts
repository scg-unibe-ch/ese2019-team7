import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferCreationForm} from '../offerCreationForm';
import { VariablesService } from '../variables.service';
import {FunctionsService} from '../functions.service';

@Component({
  selector: 'app-offer-creation-form',
  templateUrl: './offer-creation-form.component.html',
  styleUrls: ['./offer-creation-form.component.scss'],
})
export class OfferCreationFormComponent implements OnInit {

  constructor(    private httpClient: HttpClient,
                  private variables: VariablesService,
                  private functions: FunctionsService
  ) {
  }

  model = new OfferCreationForm('', '', '', '', null, null);

  categories: string[];
  isLoggedIn: boolean;
  showClear = false;

  /**
   * Sets some instance variables
   */
  ngOnInit() {
    this.categories = this.variables.getCategories();
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
  }

  onSubmit() { }

  /**
   * validates the dates (End date may not be prior to Start date), if these are accepted, sends a created form to the backend.
   */
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
      }, {withCredentials: true}).subscribe(this.functions.answer, this.functions.onSave_error);
      const resetForm = document.getElementById('offerCreationForm') as HTMLFormElement;
      resetForm.reset();
    }
  }

  /**
   * changes a date to null if it is 0, as 0 is equivalent to no input
   */
  checkDate(date: number) {
    if (date === 0) {
      return null;
    } else {
      return date;
    }
  }
}
