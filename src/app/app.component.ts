import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
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

  ngOnInit() {
    this.name.nativeElement.innerText = 'Hilton Hotel by element reference';
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
