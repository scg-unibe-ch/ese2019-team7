import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OfferItem} from '../offer-item';
import {VariablesService} from '../variables.service';
import {FunctionsService} from '../functions.service';

/**
 * Component for the list of offers an admin needs to do something with. Contains only functions for loading said offers,
 * the actions are preformed on the individual OfferItem rather than in this component.
 */

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
    private variables: VariablesService,
    private functions: FunctionsService
  ) { }

  /**
   * On Initializing, tries to load all offers the admin needs to approve; sets the admin flag to false if it gets a HTTP 401 (Unauthorized)
   */
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

  /**
   * Generates OfferItems for given input in the format needed for this component
   * @param instances: An object that contains data of all offer Items (should come from the backend)
   */
  generateOfferItems(instances: any) {
    return instances.offers.map((instance) => new OfferItem(
      instance.id,
      instance.title,
      instance.description,
      this.functions.generateDisplay(instance.price),
      instance.category,
      this.functions.generateDisplay(instance.dateFrom),
      this.functions.generateDisplay(instance.dateTo),
      instance.status,
      true,
      true,
      false));
  }
}
