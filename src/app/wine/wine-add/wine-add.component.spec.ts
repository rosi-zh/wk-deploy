import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineAddComponent } from './wine-add.component';

describe('WineAddComponent', () => {
  let component: WineAddComponent;
  let fixture: ComponentFixture<WineAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WineAddComponent]
    });
    fixture = TestBed.createComponent(WineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
