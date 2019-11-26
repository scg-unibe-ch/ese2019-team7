import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  generateDisplay(input: any) {
    if (input == null) {
      return 'N/A';
    } else {
      return String(input);
    }
  }

  onSave_error(object: any) {
    alert(object.status + ': ' + object.error.message);
  }

  answer(object: any) {
    alert(object.message);
  }

  validTel(tel: any) {
    return (tel == null || tel.value === '' || (new RegExp('[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$').test(tel.value)));
  }

}
