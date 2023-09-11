export interface Rooms {
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
}

export interface RoomList {
  roomNumber: string;
  roomType: string;
  amenities: string;
  price: number;
  photos: string;
  checkinTime: Date;
  checkoutTime: Date;
  rating: number;
}

// export class item {
//   name!: string;
//   val!: number;
// }
