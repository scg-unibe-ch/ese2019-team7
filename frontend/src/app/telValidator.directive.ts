import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export const telValidatorDirective: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const tel = control.get('tel');
  const regex = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$');

  if (tel == null || tel.value === '' || regex.test(tel.value)) {
    return null;
  }
  return { telInvalid: true };
};

@Directive({
  selector: '[appTelValid]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TelValidatorDirective, multi: true }]
})
export class TelValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return telValidatorDirective(control);
  }
}
