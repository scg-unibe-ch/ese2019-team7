import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  /**
   * Sets a string to N/A if it is null.
   */
  generateDisplay(input: any) {
    if (input == null) {
      return 'N/A';
    } else {
      return String(input);
    }
  }

  /**
   * alerts an error code and its message.
   */
  onSave_error(object: any) {
    alert(object.status + ': ' + object.error.message);
  }

  /**
   * alerts a message.
   */
  answer(object: any) {
    alert(object.message);
  }

  /**
   * Checks if an input can reasonably be expected to be a telephone number
   * Note that this is not a perfect check, it only catches idiot input.
   */
  validTel(tel: any) {
    return (tel == null || tel.value === '' || (new RegExp('[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$').test(tel.value)));
  }

}
