import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferItem} from '../offer-item';
import {VariablesService} from '../variables.service';

@Component({
  selector: 'app-own-list',
  templateUrl: './own-list.component.html',
  styleUrls: ['./own-list.component.scss'],
})
export class OwnListComponent implements OnInit {

  @Input()
  offerItem: OfferItem = new OfferItem(0, '', '', '', '', '', '', '', true, false, true);
  offerItems: OfferItem[] = [];

  isLoggedIn = false;

  constructor(
    private httpClient: HttpClient, private variables: VariablesService
  ) { }

  ngOnInit() {
    this.variables.getLogin().subscribe(login => {
      this.isLoggedIn = login;
      if (this.isLoggedIn) {
        this.httpClient.get(this.variables.getUrl().concat('/offers/myOffers'), {withCredentials: true}).subscribe((instances: any) => {
          this.offerItems = this.generateOfferItems(instances);
        }, (object: any) => {
          alert('HTTP Error ' + object.status + ': ' + object.error.message);
        });
      }
    });
  }

  generateOfferItems(instances: any) {
    return instances.offers.map((instance) => new OfferItem(
      instance.id,
      instance.title,
      instance.description,
      this.generateDisplay(instance.price),
      instance.category,
      this.generateDisplay(instance.dateFrom),
      this.generateDisplay(instance.dateTo),
      instance.status,
      true,
      false,
      true));
  }

  generateDisplay(input: any) {
    if (input == null) {
      return 'N/A';
    } else {
      return String(input);
    }
  }
}
