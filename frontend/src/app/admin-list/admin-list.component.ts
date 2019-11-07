import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferItem} from '../offer-item';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {

  @Input()
  offerItem: OfferItem = new OfferItem(0, '', '', '', '', '', '', true, true, false);
  offerItems: OfferItem[] = [];

  isAdmin = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getMessage();
    if (this.isAdmin) {
      this.httpClient.get('http://localhost:3000/adminOffers', {withCredentials: true}).subscribe((instances: any) => {
        this.offerItems = this.generateOfferItems(instances);
      }, (object: any) => {
        alert('HTTP Error ' + object.status + ': ' + object.error.message);
      });
    }
  }

  getMessage() {
    this.httpClient.get('http://localhost:3000/isAdmin', {withCredentials: true}).subscribe(
      (object: any) => { this.isAdmin = true; },
      (object: any) => { this.isAdmin = false; });
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
      true,
      false));
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
