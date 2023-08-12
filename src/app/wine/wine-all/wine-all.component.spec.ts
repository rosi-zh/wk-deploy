import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineAllComponent } from './wine-all.component';

describe('WineAllComponent', () => {
  let component: WineAllComponent;
  let fixture: ComponentFixture<WineAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WineAllComponent]
    });
    fixture = TestBed.createComponent(WineAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
