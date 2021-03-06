import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {VariablesService} from './variables.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private variables: VariablesService
  ) {
  }

  /**
   * Checks if the user is logged in on initial loading of the page.
   */
  ngOnInit() {
    this.variables.checkLoginStatus();
  }
}
