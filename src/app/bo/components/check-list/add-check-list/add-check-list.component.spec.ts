import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckListComponent } from './add-check-list.component';

describe('AddCheckListComponent', () => {
  let component: AddCheckListComponent;
  let fixture: ComponentFixture<AddCheckListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCheckListComponent]
    });
    fixture = TestBed.createComponent(AddCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
