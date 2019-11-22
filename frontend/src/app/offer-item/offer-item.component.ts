import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OfferItem} from '../offer-item';
import {ContactData} from '../contactData';
import {HttpClient} from '@angular/common/http';
import {VariablesService} from '../variables.service';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {

  @Input()
  offerItem: OfferItem;

  constructor( private httpClient: HttpClient, private variables: VariablesService) {
  }

  original: OfferItem;
  editing = false;
  categories: string[];
  isLoggedIn = false;
  isAdmin = false;
  contactData = new ContactData('N/A', 'N/A', 'N/A');
  hideContactData = true;
  displayDateFrom: string;
  displayDateTo: string;
  showDelete = false;
  showDeny = false;
  showSetPublic = false;
  reason = '';


  ngOnInit() {
    this.original = this.offerItem.clone();
    this.editing = false;
    this.displayDateFrom = this.offerItem.dateFrom.split('T')[0];
    this.displayDateTo = this.offerItem.dateTo.split('T')[0];
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
    this.variables.getAdmin().subscribe(admin => this.isAdmin = admin);
    this.categories = this.variables.getCategories();
  }

  onDelete() {
    this.httpClient.put(this.variables.getUrl().concat('/offers/delete'), {
      id: this.offerItem.id,
    }, {withCredentials: true}).subscribe(
      (object) => this.resolveRequest(this.offerItem.title + ' deleted'),
      (object) => alert(object.status + ': ' + object.error.message));
  }

  onSetPublic() {
    this.httpClient.patch(this.variables.getUrl().concat('/offers/notApproved'), {
      id: this.offerItem.id,
      approve: true
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
    let compareFrom: number;
    let compareTo: number;
    if (isNaN(Number(this.offerItem.dateTo))) {
      compareTo = new Date(this.offerItem.dateTo).valueOf();
    } else {
      compareTo = Number(this.offerItem.dateTo);
    }
    if (isNaN(Number(this.offerItem.dateFrom))) {
      compareFrom = new Date(this.offerItem.dateFrom).valueOf();
    } else {
      compareFrom = Number(this.offerItem.dateFrom);
    }
    if (compareFrom > compareTo) {
      alert('Your start date is later than your end date. Please fix this before submitting.');
    } else {
      this.httpClient.put(this.variables.getUrl().concat('/offers/edit'), {
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
  }

  generateContactData(instances) {
    if (instances.phone == null) {
      instances.phone = 'N/A';
    }
    this.contactData =  new ContactData(
      instances.name,
      instances.phone,
      instances.email);
    this.hideContactData = false;
    return this.contactData;
  }

  getContactInfo() {
    this.httpClient.put(this.variables.getUrl().concat('/offers/contact'), {
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

  onDeny() {
    this.httpClient.patch(this.variables.getUrl().concat('/offers/notApproved'), {
      id: this.offerItem.id,
      message: this.reason,
      approve: false,
    }, {withCredentials: true}).subscribe((object) => this.resolveRequest(this.offerItem.title + 'denied'),
      (object) => console.log(object) /*alert(object.status + ': ' + object.error.message)*/);
    }
}
