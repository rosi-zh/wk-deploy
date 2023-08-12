import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDeleteComponent } from './wine-delete.component';

describe('WineDeleteComponent', () => {
  let component: WineDeleteComponent;
  let fixture: ComponentFixture<WineDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WineDeleteComponent]
    });
    fixture = TestBed.createComponent(WineDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
