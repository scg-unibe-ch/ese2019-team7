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
  offerItem: OfferItem = new OfferItem('', '');
  offerItems: OfferItem[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/offeritem', {
    }).subscribe((instances: any) => {
      this.offerItems = instances.map((instance) => new OfferItem(instance.title, instance.description));
    });
  }

}
