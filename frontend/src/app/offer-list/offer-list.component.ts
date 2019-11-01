import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferItem} from '../offer-item';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {

  @Input()
  offerItem: OfferItem = new OfferItem('', '', 0, '', 0, 0);
  offerItems: OfferItem[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/offers', {
    }).subscribe((instances: any) => {
      this.offerItems = instances.map((instance) => new OfferItem(
        instance.title,
        instance.description,
        instance.price,
        instance.category,
        instance.dateFrom,
        instance.dateTo));
    }, (object: any) => {  alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

}
