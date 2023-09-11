import {
  AfterContentInit,
  Component,
  ContentChild,
  Host,
  OnInit,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/rooms-list/Services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  // providers: [RoomsService],
})
export class ContainerComponent implements OnInit, AfterContentInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  constructor() {}
  // constructor(@Host() private roomsService: RoomsService) {}

  //
  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName = 'erik'; // write content and use same design
  }

  ngOnInit(): void {}
}
