import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RoomList, Rooms } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './rooms-list/Services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = false;
  selectedRoom!: RoomList;
  title: string = 'Room List';

  rooms: Rooms = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  roomList: RoomList[] = [];
  // @ViewChild(HeaderComponent, { static: true }) headerComponent!: HeaderComponent;

  // ngAfterViewInit
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  //View Childern access all the element of type header component
  @ViewChildren(HeaderComponent)
  headerChildernComponent!: QueryList<HeaderComponent>;

  // Dependency injection
  // general we will create instance
  // roomservice = new RoomsService();

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.roomList = this.roomsService.getRooms();
    // console.log(this.headerComponent); // undefine if static true then it will give meta data
  }
  // ngDoCheck(): void {
  //   console.log('this is do check On Change called');
  //   // throw new Error('Method not implemented.');
  // dont use too much when we use ngOnChange
  // }

  ngAfterViewInit(): void {
    // console.log(this.headerComponent); // HeaderComponent {title: '', __ngContext__: LComponentView(78)}
    this.headerComponent.title = 'Rooms View';
    this.headerChildernComponent.last.title = 'Last title';
    // this.headerChildernComponent.get(0)?.title = "FirstT itle"
    // reusable and drop down records angular material use viewchilder at multiple places
  }

  ngAfterViewChecked(): void {}

  toggle() {
    // console.log(this);
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List ';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: 4,
      roomType: 'Lake View Non A/c Room',
      amenities: ' Free Wifi, Tv, Bathroom, Kitchen, Personal Workspace',
      price: 800,
      checkInTime: new Date('11-march-2023'),
      checkOutTime: new Date('12-march-2023'),
      rating: 5,
    };
    // this.roomlist.push(room)
    this.roomList = [...this.roomList, room];
  }
}
