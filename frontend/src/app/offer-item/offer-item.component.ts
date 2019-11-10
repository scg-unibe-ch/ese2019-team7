import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OfferItem} from '../offer-item';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {

  @Input()
  offerItem: OfferItem;

  constructor( private httpClient: HttpClient) {
  }

  original = new OfferItem(0, '', '', '', '', '', '', false, false, false);
  editing = false;
  categories = ['food & drink', 'entertainment', 'location', null];


  ngOnInit() {
    this.original = this.offerItem.clone();
    this.editing = false;
  }

  onDelete() {
    this.httpClient.put('http://localhost:3000/deleteOffer', {
      id: this.offerItem.id,
    }, {withCredentials: true}).subscribe(
      (object) => this.resolveRequest(this.offerItem.title + ' deleted'),
      (object) => alert(object.status + ': ' + object.error.message));
  }

  onSetPublic() {
    this.httpClient.put('http://localhost:3000/setPublic', {
      id: this.offerItem.id,
    }, {withCredentials: true}).subscribe(
      (object) => this.resolveRequest(this.offerItem.title + ' has been set public'),
      (object) => alert(object.status + ': ' + object.error.message));
  }

  // TODO rename
  resolveRequest(display: string) {
    alert(display);
    window.location.reload();
  }

  resolveEditRequest(display: string) {
    this.editing = false;
    this.resolveRequest(display);
  }

  onSubmit() { }

  onEdit() {
    this.editing = true;
  }

  onCancel() {
    this.editing = false;
    this.offerItem = this.original.clone();
  }

  onSave() {
    this.httpClient.post('http://localhost:3000/editOffer', {
      title: this.original.title,
      description: this.original.description,
      price: this.original.price,
      category: this.original.category,
      dateFrom: this.original.dateFrom,
      dateTo: this.original.dateTo,
      id: this.original.id
    }, {withCredentials: true}).subscribe( (object) => this.resolveEditRequest('offer edited'),
      (object) => alert(object.status + ': ' + object.error.message));
  }
}
