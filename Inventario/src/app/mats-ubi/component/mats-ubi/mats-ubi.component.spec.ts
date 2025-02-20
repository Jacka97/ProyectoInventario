import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatsUbiComponent } from './mats-ubi.component';

describe('MatsUbiComponent', () => {
  let component: MatsUbiComponent;
  let fixture: ComponentFixture<MatsUbiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatsUbiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatsUbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
