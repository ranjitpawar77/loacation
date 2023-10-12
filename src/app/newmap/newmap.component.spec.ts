import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmapComponent } from './newmap.component';

describe('NewmapComponent', () => {
  let component: NewmapComponent;
  let fixture: ComponentFixture<NewmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewmapComponent]
    });
    fixture = TestBed.createComponent(NewmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
