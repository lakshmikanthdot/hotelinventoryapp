import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RoomList, Rooms } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './rooms-list/Services/rooms.service';
import {
  Observable,
  Subject,
  Subscription,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../service/config.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = true;
  selectedRoom!: RoomList;
  title: string = 'Room List';

  rooms: Rooms = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  totalBytes = 0;
  subscription!: Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      // this.error$.next(err.error);
      // return throwError(err);
      return of([]); // Argument of type '(err: any) => void' is not assignable to parameter of type '(err: any, caught: Observable<RoomList[]>) => ObservableInput<any>'.Type 'void' is not assignable to type 'ObservableInput<any>'.ts(2345) function(err: any): void
    })
  );

  // map operator
  // modify stream not subscribing it manually
  roomsCount$ = this.roomsService.getRooms$.pipe(map((data) => data.length));

  // instance with interface
  roomList: RoomList[] = [];

  // @ViewChild(HeaderComponent, { static: true }) headerComponent!: HeaderComponent;

  stream = new Observable<string>((observer) => {
    observer.next('user1'); // metgod called next means it will emit the new data, who ever sub will get this data
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  // ngAfterViewInit
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  //View Childern access all the element of type header component
  @ViewChildren(HeaderComponent)
  headerChildernComponent!: QueryList<HeaderComponent>;

  // Dependency injection
  // general we will create instance
  // roomservice = new RoomsService();
  constructor(
    @SkipSelf() private roomsService: RoomsService,
    private configservice: ConfigService
  ) {}

  ngOnInit(): void {
    // this.roomList = this.roomsService.getRooms(); // if we use as http error : Type 'Observable<Object>' is missing the following properties from type 'RoomList[]': length, pop, push, concat, and 27 more.ts(2740)

    // this.roomList = this.roomsService.getRooms(); // load by mock data

    // console.log(this.headerComponent); // undefine if static true then it will give meta data

    // http
    // this.roomsService.getRooms().subscribe((r) => {
    // using $steam for one call data availble for 2 places shareReply
    this.subscription = this.roomsService.getRooms$.subscribe((r) => {
      // this.roomList = r;
      /* add Roomlist array to remove error in service file 
       getRooms() {
       // return this.roomList;
       // getting data from api
       return this.http.get<RoomList[]>('/api/rooms');
       }
      */
      // this.roomList = r; // error The 'Object' type is assignable to very few other types. Did you mean to use the 'any' type instead?Type 'Object' is missing the following properties from type 'RoomList[]': length, pop, push, concat, and 28 more.ts(2696) this: this
      // roomlist is array but we are trying to assign the object
    });

    // photos
    // call http request bu using large dummy api
    this.roomsService.getPhotos().subscribe((event) => {
      // console.log(event); // HttpHeaderResponse, HttpResponse
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request Success');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          console.log(this.totalBytes);

          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });

    // rxjs
    this.stream.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });

    this.stream.subscribe((data) => {
      console.log(data);
    });
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
      roomNumber: '4',
      roomType: 'Lake View Non A/c Room',
      amenities: ' Free Wifi, Tv, Bathroom, Kitchen, Personal Workspace',
      price: 800,
      photos: 'ok',
      checkinTime: new Date('11-march-2023'),
      checkoutTime: new Date('12-march-2023'),
      rating: 5,
    };
    // this.roomlist.push(room)
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Lake View Non A/c Room',
      amenities: ' Free Wifi, Tv, Bathroom, Kitchen, Personal Workspace',
      price: 800,
      photos: 'ok',
      checkinTime: new Date('11-march-2023'),
      checkoutTime: new Date('12-march-2023'),
      rating: 5,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      // any active subscription then it will unsubscribe
      this.subscription.unsubscribe();
    }
  }
}

// rxjs works on push architecture

// push getData -> Continous Stream of Data any modify -> addData directly to stream, stream updated who ever subscribe the stream can get data with out call the data

// pull data = getData -> addData(modify) -> getData
