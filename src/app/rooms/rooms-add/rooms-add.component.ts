import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../rooms-list/Services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.css'],
})
export class RoomsAddComponent implements OnInit {
  constructor(private roomsServive: RoomsService) {}

  ngOnInit(): void {}

  // default values connect the modle to form
  room: RoomList = {
    roomNumber: '0',
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0,
  };

  successMessage: string = '';

  addRoom(roomsForm: NgForm) {
    this.roomsServive.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'Room Added Successfully';
      // roomsForm.reset();
      roomsForm.resetForm({
        // reset form with default values
        roomNumber: '0',
        roomType: '',
        amenities: '',
        price: 0,
        photos: '',
        checkinTime: new Date(),
        checkoutTime: new Date(),
        rating: 0,
      });
    });
  }
}
