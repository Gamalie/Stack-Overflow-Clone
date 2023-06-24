import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorUpdateComponent } from './addor-update.component';

describe('AddorUpdateComponent', () => {
  let component: AddorUpdateComponent;
  let fixture: ComponentFixture<AddorUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddorUpdateComponent]
    });
    fixture = TestBed.createComponent(AddorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
