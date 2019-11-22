import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferItem} from '../offer-item';
import {VariablesService} from '../variables.service';

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
    private variables: VariablesService
  ) { }

  ngOnInit() {
    this.categories = this.variables.getCategories();
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
    this.httpClient.get(this.variables.getUrl().concat('/offers')).subscribe((instances: any) => {
      this.offerItems = this.generateOfferItems(instances);
    }, (object: any) => {  alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  generateOfferItems(instances: any) {
    return instances.offers.map((instance) => new OfferItem(
      instance.id,
      instance.title,
      instance.description,
      this.generatePriceDisplay(instance.price),
      instance.category,
      this.generateDateDisplay(instance.dateFrom),
      this.generateDateDisplay(instance.dateTo),
      '',
      false,
      false,
      false));
  }

  generatePriceDisplay(price: number) {
    if (price == null) {
      return 'N/A';
    } else {
      return String(price);
    }
  }
  generateDateDisplay(date: string) {
    if (date == null) {
      return 'N/A';
    } else {return String(date); }
  }

  onSearch() {
    this.httpClient.put(this.variables.getUrl().concat('/offers/search'),  {
      searchKey: this.searchKey,
      category: this.category }
    ).subscribe((instances: any) => {
      this.offerItems = this.generateOfferItems(instances);
    }, (object: any) => {  alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  onExtendedSearch() {
    const attributes = [];
    if (this.searchInTitle) {
      attributes[attributes.length] = 'title';
    }
    if (this.searchInDescription) {
      attributes[attributes.length] = 'description';
    }
    if (this.searchInUsername) {
      attributes[attributes.length] = '$provider.name$';
    }
    console.log(attributes);
    this.httpClient.put(this.variables.getUrl().concat('/offers/search'), {
      searchKey: this.searchKey,
      category: this.category,
      attributes,
    }, {withCredentials: true}).subscribe((instances: any) => {
      this.offerItems = this.generateOfferItems(instances);
    }, (object: any) => {alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }
}
