import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { ConfigService } from '../service/config.service';
import { RoomsService } from './rooms-list/Services/rooms.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { urlService } from '../AppConfig/appconfig.service';
import { RouteConfigToken } from '../service/routeConfig.service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RoomsComponent],
      providers: [
        RoomsService,
        ConfigService,
        {
          provide: urlService,
          useValue: { apiEndpoints: 'http://localhost:3000' },
        },
        {
          provide: RouteConfigToken,
          useValue: { title: 'rooms' },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle', () => {
    component.hideRooms = false;
    component.toggle();
    expect(component.hideRooms).toBe(true);
  });
});
