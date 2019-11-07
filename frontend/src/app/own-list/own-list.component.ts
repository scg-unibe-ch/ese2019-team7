import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferItem} from '../offer-item';

@Component({
  selector: 'app-own-list',
  templateUrl: './own-list.component.html',
  styleUrls: ['./own-list.component.scss'],
})
export class OwnListComponent implements OnInit {

  @Input()
  offerItem: OfferItem = new OfferItem(0, '', '', '', '', '', '', true, false, true);
  offerItems: OfferItem[] = [];

  isLoggedIn = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getMessage();
    if (this.isLoggedIn) {
      this.httpClient.get('http://localhost:3000/myOffers', {withCredentials: true}).subscribe((instances: any) => {
        this.offerItems = this.generateOfferItems(instances);
      }, (object: any) => {
        alert('HTTP Error ' + object.status + ': ' + object.error.message);
      });
    }
  }

  getMessage() {
    this.httpClient.get('http://localhost:3000/protected', {withCredentials: true}).subscribe(
      (object: any) => { this.isLoggedIn = true; },
      (object: any) => { this.isLoggedIn = false; });
  }

  generateOfferItems(instances: any) {
    return instances.offers.map((instance) => new OfferItem(
      instance.id,
      instance.title,
      instance.description,
      this.generatePriceDisplay(instance.price),
      instance.category,
      instance.dateFrom,
      instance.dateTo,
      true,
      false,
      true));
  }

  generatePriceDisplay(price: number) {
    if (price == null) {
      return 'N/A';
    } else {
      return String(price);
    }
  }

  generateDateDisplay(date: number) {
    if (date == null) {
      return 'N/A';
    } else {return String(date); }
  }
}