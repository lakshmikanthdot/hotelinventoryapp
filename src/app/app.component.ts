import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './service/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
// import { item } from './rooms/rooms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `<h1>Hello World From inline Templete</h1>
  //   <p>ok baby</p>`,
  styleUrls: ['./app.component.css'],
  // styles : [`h1{color:red}`]
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorages: any,
    private initService: InitService,
    private configservice: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
    // console.log(initService.init);
  }

  ngOnInit() {
    // this.router.events.subscribe((event) => console.log(event)); // 12 events

    // show loader
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((e) => {
        console.log('Navigation Started');
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => {
        console.log('Navigation Ended');
      });

    // loader ended
    this.name.nativeElement.innerText = 'Hilton Hotel by element reference';
    this.loggerService?.log('Appcomponent.NgOnInit() from @Optional()'); // it we not use ? terminery operator Cannot read properties of null (reading 'log')
    this.localStorages.setItem('Hotel Name', 'Hilton Hotel');
  }

  // dynamically load the room component
  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  //AfterViewInit
  // ngAfterViewInit() {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }

  // role = 'Admin';

  // items: item[] = [
  //   { name: 'One', val: 1 },
  //   { name: 'Two', val: 2 },
  //   { name: 'Three', val: 3 },
  // ];
  // selectedValue: string = 'One';
}
