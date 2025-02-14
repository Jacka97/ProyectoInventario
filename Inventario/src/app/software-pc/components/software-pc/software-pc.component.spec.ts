import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwarePcComponent } from './software-pc.component';

describe('SoftwarePcComponent', () => {
  let component: SoftwarePcComponent;
  let fixture: ComponentFixture<SoftwarePcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoftwarePcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoftwarePcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
