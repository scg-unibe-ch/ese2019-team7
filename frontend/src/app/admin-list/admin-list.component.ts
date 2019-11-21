import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferItem} from '../offer-item';
import {VariablesService} from '../variables.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {

  @Input()
  offerItem: OfferItem = new OfferItem(0, '', '', '', '', '', '', '', true, true, false);
  offerItems: OfferItem[] = [];

  isAdmin = false;

  constructor(
    private httpClient: HttpClient,
    private variables: VariablesService
  ) { }

  ngOnInit() {
    this.httpClient.get(this.variables.getUrl().concat('/offers/notApproved'), {withCredentials: true}).subscribe((instances: any) => {
      this.isAdmin = true;
      this.offerItems = this.generateOfferItems(instances);
    }, (object: any) => {
      if ( object.status === 401) {
        this.isAdmin = false;
      } else {
        alert('HTTP Error ' + object.status + ': ' + object.error.message);
      }
    });
  }

  generateOfferItems(instances: any) {
    return instances.offers.map((instance) => new OfferItem(
      instance.id,
      instance.title,
      instance.description,
      this.generatePriceDisplay(instance.price),
      instance.category,
      this.generateDateDisplay(instance.dateFrom),
      this.generateDateDisplay(instance.dateTo),
      instance.status,
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
