import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OfferItem} from '../offer-item';
import {ContactData} from '../contactData';
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
  categories = ['other', 'catering', 'entertainment', 'location'];
  isLoggedIn = false;
  contactData = new ContactData('N/A', 'N/A', 'N/A');
  hideContactData = true;
  hideButton = false;
  displayDateFrom: string;
  displayDateTo: string;


  ngOnInit() {
    this.original = this.offerItem.clone();
    this.editing = false;
    this.displayDateFrom = this.offerItem.dateFrom.split('T')[0];
    this.displayDateTo = this.offerItem.dateTo.split('T')[0];
    this.getMessage();
  }

  getMessage() {
    this.httpClient.get('http://localhost:3000/protected', {withCredentials: true}).subscribe(
      (object: any) => { this.isLoggedIn = true; },
      (object: any) => { this.isLoggedIn = false; });
  }

  onDelete() {
    this.httpClient.put('http://localhost:3000/offers/delete', {
      id: this.offerItem.id,
    }, {withCredentials: true}).subscribe(
      (object) => this.resolveRequest(this.offerItem.title + ' deleted'),
      (object) => alert(object.status + ': ' + object.error.message));
  }

  onSetPublic() {
    this.httpClient.patch('http://localhost:3000/offers/notApproved', {
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
    if (this.offerItem.dateFrom === 'N/A') {
      this.offerItem.dateFrom = null;
    }
    if (this.offerItem.dateTo === 'N/A') {
      this.offerItem.dateTo = null;
    }
    this.editing = true;
  }

  onCancel() {
    this.editing = false;
    this.offerItem = this.original.clone();
  }

  onSave() {
    this.offerItem.dateFrom = this.checkDate(this.offerItem.dateFrom);
    this.offerItem.dateTo = this.checkDate(this.offerItem.dateTo);
    this.httpClient.put('http://localhost:3000/offers/edit', {
      title: this.offerItem.title,
      description: this.offerItem.description,
      price: this.offerItem.price,
      category: this.offerItem.category,
      dateFrom: this.offerItem.dateFrom,
      dateTo: this.offerItem.dateTo,
      id: this.offerItem.id
    }, {withCredentials: true}).subscribe((object) => this.resolveEditRequest('offer edited'),
      (object) => alert(object.status + ': ' + object.error.message));
  }

  generateContactData(instances) {
    if (instances.tel == null) {
      instances.tel = 'N/A';
    }
    this.contactData = instances.user.map((instance) => new ContactData(
      instance.username,
      instance.tel,
      instance.email));
    this.hideContactData = false;
    this.hideButton = true;
    return this.contactData;
  }

  getContactInfo() {
    this.httpClient.put('http://localhost:3000/contact', {
      id: this.offerItem.id,
    }, {withCredentials: true}).subscribe((instances: any) => {
      this.contactData = this.generateContactData(instances);
    }, (object: any) => {  alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  checkDate(date: string) {
    if (date === '1970-01-01T00:00:00.000Z') {
      return null;
    } else {
      return date;
    }
  }

}
