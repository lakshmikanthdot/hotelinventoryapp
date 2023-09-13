import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css'],
})
export class RoomsBookingComponent implements OnInit {
  // id: number = 0;

  // 3rd method stream
  // id$!: Observable<number>;
  // id$ = this.router.params.pipe(map((params) => params['roomId']));
  // 4th method
  // id$ = this.router.paramMap.subscribe((params) => {
  //   params.get('roomId');
  // });
  id$ = this.router.paramMap.pipe(map((params) => params.get('roomId')));

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    // 1st method memory lekage
    // this.router.params.subscribe((params) => {
    //   // this.id = params.roomId;
    //   // Property 'roomId' comes from an index signature, so it must be accessed with ['roomId']
    //   this.id = params['roomId'];
    //   console.log(params);
    // });
    // 2nd method
    // this.id = this.router.snapshot.params['roomId'];
    // snapshot cannot updated the value in case we are changing the value in same view (child component)
    // 3rd methood
    // this.id$ = this.router.params.pipe(map((params) => params['roomId']));
    //4th method if we have multiple params(values)
    // this.router.paramMap.subscribe((params) => {
    //   params.get('roomId');
    // });
  }
}
