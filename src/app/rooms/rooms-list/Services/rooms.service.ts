import { Injectable } from '@angular/core';
import { RoomList } from '../../rooms';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomList: RoomList[] = [
    {
      roomNumber: 1,
      roomType: 'Deluxe Room',
      amenities: 'Free Wifi, Tv, Bathroom, Kitchen',
      price: 500,
      checkInTime: new Date('11-march-2023'),
      checkOutTime: new Date('12-march-2023'),
      rating: 4.2,
    },
    {
      roomNumber: 2,
      roomType: 'Deluxe AC Room',
      amenities: 'A/c, Free Wifi, Tv, Bathroom, Kitchen',
      price: 1000,
      checkInTime: new Date('11-march-2023'),
      checkOutTime: new Date('12-march-2023'),
      rating: 3.35666,
    },
    {
      roomNumber: 3,
      roomType: 'Private Room',
      amenities: 'A/c, Free Wifi, Tv, Bathroom, Kitchen, Personal Workspace',
      price: 10000,
      checkInTime: new Date('11-march-2023'),
      checkOutTime: new Date('12-march-2023'),
      rating: 4.8,
    },
  ];

  constructor() {}
  getRooms() {
    return this.roomList;
  }
}
