import { Component, OnInit } from '@angular/core';
import {VariablesService} from '../variables.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  constructor(private variables: VariablesService) { }

  ngOnInit() {}

}
