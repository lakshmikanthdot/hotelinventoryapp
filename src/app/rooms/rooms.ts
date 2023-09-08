export interface Rooms {
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
}

export interface RoomList {
  roomNumber: number;
  roomType: string;
  amenities: string;
  price: number;
  checkInTime: Date;
  checkOutTime: Date;
  rating: number;
}

// export class item {
//   name!: string;
//   val!: number;
// }
