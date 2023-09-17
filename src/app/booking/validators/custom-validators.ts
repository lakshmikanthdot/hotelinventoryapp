import { AbstractControl, FormGroup } from '@angular/forms';

export class customValidator {
  static validateName(control: AbstractControl) {
    const value = control.value as string;
    if (value.includes('test')) {
      return { invalidName: true };
    }
    return null;
  }

  //   static validateSpecialChar(control: AbstractControl) {
  //     const value = control.value as string;
  //     if (value.includes('!')) {
  //       return { invalidSpecialChar: true };
  //     }
  //     return null;
  //   }

  // function inside the function we can pass the char as parameter
  static validateSpecialChar(char: string) {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (value.includes(char)) {
        return { invalidSpecialChar: true };
      }
      return null;
    };
  }

  //   static validateDate(control: AbstractControl) {
  static validateDate(control: FormGroup) {
    const checkinDate: any = new Date(control.get('checkinDate')?.value);
    const checkoutDate: any = new Date(control.get('checkoutDate')?.value);
    const diffTime = checkoutDate - checkinDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffTime);
    // console.log(diffDays);

    if (diffDays <= 0) {
      control.get('checkoutDate')?.setErrors({ invalidDate: true });
      return { invalidDate: true };
    }
    return null;
  }
}
