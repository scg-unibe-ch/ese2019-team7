import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss'],
})
export class ProtectedComponent implements OnInit {

  welcomeMessage = '';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/protected', {withCredentials: true}).subscribe( this.answer, this.onSave_error);
  }

  onSave_error(object: any) {
    this.welcomeMessage = 'HTTP Error ' + object.status + ': ' + object.error.message + object.error.lengthComputable;
    alert(this.welcomeMessage);
  }

  answer(object: any) {
    this.welcomeMessage = object.message;
    alert(this.welcomeMessage);
  }

}
