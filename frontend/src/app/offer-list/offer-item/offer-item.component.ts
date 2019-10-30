import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OfferItem} from '../../offer-item';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {

  @Input()
  offerItem: OfferItem;

  constructor(
  ) { }

  ngOnInit() {}

}
