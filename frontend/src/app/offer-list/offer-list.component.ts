import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferItem} from '../offer-item';
import {VariablesService} from '../variables.service';
import {FunctionsService} from '../functions.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {

  @Input()
  offerItem: OfferItem = new OfferItem(0, '', '', '', '', '', '', '', false, false, false);
  offerItems: OfferItem[] = [];

  categories: string[];
  searchKey = '';
  category = '';
  isLoggedIn = false;
  extended = false;
  searchInTitle = true;
  searchInDescription = false;
  searchInUsername = false;

  constructor(
    private httpClient: HttpClient,
    private variables: VariablesService,
    private functions: FunctionsService
  ) { }

  /**
   * Sets some instance variables and loads relevant offers from backend.
   */
  ngOnInit() {
    this.categories = this.variables.getCategories();
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
    this.httpClient.get(this.variables.getUrl().concat('/offers')).subscribe((instances: any) => {
      this.offerItems = this.generateOfferItems(instances);
    }, (object: any) => {  alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  /**
   * preforms a simple search request to the backend; loads search results on success.
   */
  onSearch() {
    this.httpClient.put(this.variables.getUrl().concat('/offers/search'),  {
      searchKey: this.searchKey,
      category: this.category }
    ).subscribe((instances: any) => {
      this.offerItems = this.generateOfferItems(instances);
    }, (object: any) => {  alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  /**
   * Preforms an extended search request to the backend, loads search results on success.
   * Note that credentials are required here, as a search for user name is only allowed for logged in users.
   */
  onExtendedSearch() {
    const attributes = this.generateAttributes();
    this.httpClient.put(this.variables.getUrl().concat('/offers/search'), {
      searchKey: this.searchKey,
      category: this.category,
      attributes,
    }, {withCredentials: true}).subscribe((instances: any) => {
      this.offerItems = this.generateOfferItems(instances);
    }, (object: any) => {alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  /**
   * generates offerItems in the format necessary for this component.
   * @param instances: The offer items returned from the backend.
   */
  generateOfferItems(instances: any) {
    return instances.offers.map((instance) => new OfferItem(
      instance.id,
      instance.title,
      instance.description,
      this.functions.generateDisplay(instance.price),
      instance.category,
      this.functions.generateDisplay(instance.dateFrom),
      this.functions.generateDisplay(instance.dateTo),
      '',
      false,
      false,
      false));
  }

  /**
   * Generates an array of attributes in the format required by backend from the booleans set in the form.
   * Note that username is set to false if logged out in order to prevent the form from becoming unusable if logging out
   * while the username option is selected.
   */
  private generateAttributes() {
    const attributes = [];
    if (!this.isLoggedIn) {
      this.searchInUsername = false;
    }
    if (this.searchInTitle) {
      attributes[attributes.length] = 'title';
    }
    if (this.searchInDescription) {
      attributes[attributes.length] = 'description';
    }
    if (this.searchInUsername) {
      attributes[attributes.length] = '$provider.name$';
    }
    return attributes;
  }
}
