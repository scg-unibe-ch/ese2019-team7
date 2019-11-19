import { Component, OnInit } from '@angular/core';
import {VariablesService} from '../variables.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  constructor(private variables: VariablesService) { }

  ngOnInit() {
    // Get the container element
    let listContainer = document.getElementById('ul');

// Get all buttons with class="li" inside the container
    let entries = listContainer.getElementsByClassName('li');

// Loop through the list entries and add the active class to the current/clicked entry
    for (let i = 0; i < entries.length; i++) {
      entries[i].addEventListener('click', function() {
        let current = document.getElementsByClassName('active');

        // If there's no active class
        if (current.length > 0) {
          current[0].className = current[0].className.replace(' active', '');
        }

        // Add the active class to the current/clicked list entry
        this.className += ' active';
      });
    }}



}
