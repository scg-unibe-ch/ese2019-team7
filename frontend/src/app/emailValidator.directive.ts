import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/**
 * Check if an input can reasonably be expected to be an email address. Note that this does not check if the email address
 * or its host exist, and is not assumed to be perfect for all input either.
 */

export const emailValidatorDirective: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const email = control.get('email');
  const regex = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

  if (email == null || regex.test(email.value)) {
    return null;
  }
  return { emailInvalid: true };
};

@Directive({
  selector: '[appEmailValid]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return emailValidatorDirective(control);
  }
}
