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
  categories = ['food & drink', 'entertainment', 'location', null];
  model: OfferItem;
  editing: boolean;

  constructor( private httpClient: HttpClient) {
    this.model = this.offerItem;
    this.editing = false;
  }

  ngOnInit() {}

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
    this.model = this.offerItem;
  }

  onSave() {
    this.httpClient.post('http://localhost:3000/editOffer', {
      title: this.model.title,
      description: this.model.description,
      price: this.model.price,
      category: this.model.category,
      dateFrom: this.model.dateFrom,
      dateTo: this.model.dateTo,
      id: this.model.id
    }, {withCredentials: true}).subscribe( (object) => this.resolveEditRequest('offer edited'),
      (object) => alert(object.status + ': ' + object.error.message));
  }
}
