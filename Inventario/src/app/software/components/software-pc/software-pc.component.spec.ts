import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwarePCComponent } from './software-pc.component';

describe('SoftwarePCComponent', () => {
  let component: SoftwarePCComponent;
  let fixture: ComponentFixture<SoftwarePCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoftwarePCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoftwarePCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
