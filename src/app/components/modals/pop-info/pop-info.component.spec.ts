import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopInfoComponent } from './pop-info.component';

describe('PopInfoComponent', () => {
  let component: PopInfoComponent;
  let fixture: ComponentFixture<PopInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
