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

  /**
   * Initializes the offer item and various variables used by different functions.
   */
  ngOnInit() {
    this.original = this.offerItem.clone();
    this.editing = false;
    this.displayDateFrom = this.offerItem.dateFrom.split('T')[0];
    this.displayDateTo = this.offerItem.dateTo.split('T')[0];
    this.variables.getLogin().subscribe(login => this.isLoggedIn = login);
    this.variables.getAdmin().subscribe(admin => this.isAdmin = admin);
    this.categories = this.variables.getCategories();
  }

  /**
   * Sends a delete request to the backend.
   */
  onDelete() {
    this.httpClient.put(this.variables.getUrl().concat('/offers/delete'), {
      id: this.offerItem.id,
    }, {withCredentials: true}).subscribe(
      (object) => this.alertAndReload(this.offerItem.title + ' deleted'),
      (object) => alert(object.status + ': ' + object.error.message));
  }

  /**
   * Sends a request to the backend to set the offer to public.
   */
  onSetPublic() {
    this.httpClient.patch(this.variables.getUrl().concat('/offers/notApproved'), {
      id: this.offerItem.id,
      approve: true
    }, {withCredentials: true}).subscribe(
      (object) => this.alertAndReload(this.offerItem.title + ' has been set public'),
      (object) => alert(object.status + ': ' + object.error.message));
  }

  /**
   * alerts a message and reloads the page.
   */
  alertAndReload(display: string) {
    alert(display);
    window.location.reload();
  }

  /**
   * Sets editing to false, alert a message and reload the page.
   */
  resolveEditRequest(display: string) {
    this.editing = false;
    this.alertAndReload(display);
  }

  onSubmit() { }

  /**
   * Changes visible N/As to null so that the fields can be edited.
   */
  onEdit() {
    if (this.offerItem.dateFrom === 'N/A') {
      this.offerItem.dateFrom = null;
    }
    if (this.offerItem.dateTo === 'N/A') {
      this.offerItem.dateTo = null;
    }
    this.editing = true;
  }

  /**
   * reverts changes made by the user and closes editing window.
   */
  onCancel() {
    this.editing = false;
    this.offerItem = this.original.clone();
  }

  /**
   * Changes the format of different values input by the user to the format needed by the database.
   * Sends an edit request to the backend, after checking that the dates are in order.
   */
  onSave() {
    this.offerItem.dateFrom = this.checkDate(this.offerItem.dateFrom);
    this.offerItem.dateTo = this.checkDate(this.offerItem.dateTo);
    const compareTo = this.generateCompare(this.offerItem.dateTo);
    const compareFrom = this.generateCompare(this.offerItem.dateFrom);
    this.offerItem.price = this.checkPrice(this.offerItem.price);
    console.log(compareFrom);
    console.log(compareTo);
    if (compareTo !== 0 && compareFrom !== 0 && compareFrom > compareTo) {
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

  /**
   * Sets the price to null if it is empty
   */
  private checkPrice(price: string) {
    if (price === '') {
      return null;
    } else {
      return price;
    }
  }

  /**
   * formats dates to numbers, so that they can be compared.
   */
  private generateCompare(compareString: string) {
    if (isNaN(Number(compareString))) {
      return new Date(compareString).valueOf();
    } else {
      return Number(compareString);
    }
  }

  /**
   * generates the contact data and makes it visible
   */
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

  /**
   * sends a request for the contact data of this offer item to the backend.
   */
  getContactInfo() {
    this.httpClient.put(this.variables.getUrl().concat('/offers/contact'), {
      id: this.offerItem.id,
    }, {withCredentials: true}).subscribe((instances: any) => {
      this.contactData = this.generateContactData(instances);
    }, (object: any) => {  alert('HTTP Error ' + object.status + ': ' + object.error.message); });
  }

  /**
   * sets the date to null if it is epoch.
   */
  checkDate(date: string) {
    if (date === '1970-01-01T00:00:00.000Z') {
      return null;
    } else {
      return date;
    }
  }

  /**
   * Sends a denial request to the backend.
   */
  onDeny() {
    this.httpClient.patch(this.variables.getUrl().concat('/offers/notApproved'), {
      id: this.offerItem.id,
      message: this.reason,
      approve: false,
    }, {withCredentials: true}).subscribe((object) => this.alertAndReload(this.offerItem.title + ' denied'),
      (object) => alert(object.status + ': ' + object.error.message));
    }
}
