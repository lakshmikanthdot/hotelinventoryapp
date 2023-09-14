import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  constructor(private configservice: ConfigService) {}

  ngOnInit(): void {}
}
