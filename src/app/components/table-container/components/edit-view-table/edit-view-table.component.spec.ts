import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViewTableComponent } from './edit-view-table.component';

describe('EditViewTableComponent', () => {
  let component: EditViewTableComponent;
  let fixture: ComponentFixture<EditViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditViewTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
