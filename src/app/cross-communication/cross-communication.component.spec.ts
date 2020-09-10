import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossCommunicationComponent } from './cross-communication.component';

describe('CrossCommunicationComponent', () => {
  let component: CrossCommunicationComponent;
  let fixture: ComponentFixture<CrossCommunicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossCommunicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
