import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, map, mergeMap, switchMap } from 'rxjs';
import { customValidator } from './validators/custom-validators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configservice: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');
    // const id$ = this.route.paramMap.pipe(map((params) => params.get('roomId')));

    this.bookingForm = this.fb.group(
      {
        // roomId: new FormControl({ value: '2', disabled: true }),
        // validator was interface used in custom validation for templete driven form

        // we can write roomId : [''],
        // mobileNumber: ['',[Validators.required]],
        roomId: new FormControl(
          { value: roomId, disabled: true },
          { validators: [Validators.required] }
        ),
        guestName: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          customValidator.validateName,
          customValidator.validateSpecialChar('*'),
        ]),
        guestEmail: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required, Validators.email],
        }),
        mobileNumber: new FormControl('', { updateOn: 'blur' }),
        bookingAmount: new FormControl(''),
        checkinDate: new FormControl(''),
        checkoutDate: new FormControl(''),
        bookingDate: new FormControl(''),
        bookingStatus: new FormControl(''),
        address: this.fb.group({
          addressLine1: new FormControl('', {
            validators: Validators.required,
          }),
          addressLine2: new FormControl(''),
          city: new FormControl('', { validators: Validators.required }),
          state: new FormControl('', { validators: Validators.required }),
          country: new FormControl(''),
          zipCode: new FormControl('', [Validators.maxLength(5)]),
        }),
        guestList: new FormControl(''),
        // adding guest array no of persons
        guests: this.fb.array([
          // this.fb.group({ guestName: [''], age: new FormControl('') }),
          this.addGuestControl(),
        ]),
        terms: new FormControl(false, {
          validators: [Validators.requiredTrue],
        }),
      },
      { updateOn: 'blur', validators: [customValidator.validateDate] }
      // effect on total entire value
      // { updateOn: 'blur' }
    );

    this.getBookingData();

    // value Changes capture
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   // console.log(data);
    //   this.bookingService.bookRoom(data).subscribe((data) => {});
    // });

    // map Operators using api value changes

    // mergeMap : doesnot care about the sequence and post the data as soon as data provided
    // this.bookingForm.valueChanges
    //   .pipe(mergeMap((data) => this.bookingService.bookRoom(data)))
    //   .subscribe((data) => console.log(data));

    // switchmap lot of request getting cancelled will provide latest data
    // this.bookingForm.valueChanges
    //   .pipe(switchMap((data) => this.bookingService.bookRoom(data)))
    //   .subscribe((data) => console.log(data));

    // exhaustMap care about the sequence untill the pervious request completed cannot subscribe the latest changes
    this.bookingForm.valueChanges
      .pipe(exhaustMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => console.log(data));
  }
  addBooking() {
    // console.log(this.bookingForm.value); // disabled value not shown
    console.log(this.bookingForm.getRawValue()); // all roomsid will show if it was disable also
    // this.bookingService
    //   .bookRoom(this.bookingForm.getRawValue())
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    this.bookingForm.reset({
      // reset the data
      roomId: '',
      guestName: '',
      guestEmail: '',
      mobileNumber: '',
      bookingAmount: '',
      checkinDate: '',
      checkoutDate: '',
      bookingDate: '',
      bookingStatus: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guestList: '',
      guests: [],
      terms: false,
    });
  }

  // addGuest() {
  //   this.guests.push(
  //     this.fb.group({ guestName: [''], age: new FormControl('') })
  // code refactor
  //   );
  // }

  // setvalue vs Patch value
  getBookingData() {
    this.bookingForm.patchValue({
      // this.bookingForm.setValue({
      // if we not add all values error Must supply a value for form control at index: 0
      // we are removing the checkoutDate setValue throw error because every control need to set but patch it igrone the error
      // Must supply a value for form control with name: 'checkoutDate'.
      guestName: 'lucky',
      guestEmail: 'test@gmai.com',
      mobileNumber: '8008781888',
      bookingAmount: '',
      checkinDate: new Date('10-02-2022'),
      bookingDate: '',
      bookingStatus: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guestList: '',
      guests: [],
      terms: false,
    });
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl(''),
    });
  }

  //add control
  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    // check if it have it will remove
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  // remove the guest in array with the index number removeAt(i)
  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}
