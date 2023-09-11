import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../../rooms';
import { urlService } from '../../../AppConfig/appconfig.service';
import { UrlValueInterface } from '../../../AppConfig/appconfig.interface';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';
// import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomList: RoomList[] = [];

  // replay the last one record which have we have recieved. getrooms is property and $ which is stream. we dont want to call it on ngoninit, which will avoid subscription as well. getRooms$ this in ts file will call only one time
  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(shareReplay(1));

  constructor(
    @Inject(urlService) private url: UrlValueInterface,
    private http: HttpClient
  ) {
    // GETTING url from  VALUE provider
    console.log(this.url.apiEndpoints);

    // console.log(environment.apiEndpoint);

    console.log('room service initialized...');
  }
  getRooms() {
    // return this.roomList;
    // getting data from api
    // generic syntax <RoomList[]>
    return this.http.get<RoomList[]>('/api/rooms');
  }

  // returing the entire list but in real time only updated one will return
  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  // not return any data real time
  delete(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const url = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );
    return this.http.request(url);
  }
}
