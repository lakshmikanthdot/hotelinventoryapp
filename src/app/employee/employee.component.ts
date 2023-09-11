import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/rooms-list/Services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  // providers: [RoomsService], //  which means it is seperate instance changes are refecleted in this component itsleft
  // providers: [RoomsService], // @Self will check here itself not check the root and throw error if we not create providers
})
export class EmployeeComponent implements OnInit {
  empName: string = 'jhon';

  constructor(
    // @Self() private roomsservice: RoomsService,
    private roomsservice: RoomsService // from host container need to remove the providers
  ) {}

  ngOnInit(): void {}
}
