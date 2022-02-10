import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardViewTableComponent } from './standard-view-table.component';

describe('StandardViewTableComponent', () => {
  let component: StandardViewTableComponent;
  let fixture: ComponentFixture<StandardViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardViewTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
