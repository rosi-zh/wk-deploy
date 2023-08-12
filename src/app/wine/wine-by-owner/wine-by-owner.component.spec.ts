import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineByOwnerComponent } from './wine-by-owner.component';

describe('WineByOwnerComponent', () => {
  let component: WineByOwnerComponent;
  let fixture: ComponentFixture<WineByOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WineByOwnerComponent]
    });
    fixture = TestBed.createComponent(WineByOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
