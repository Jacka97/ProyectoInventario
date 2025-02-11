import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DipositivosComponent } from './dipositivos.component';

describe('DipositivosComponent', () => {
  let component: DipositivosComponent;
  let fixture: ComponentFixture<DipositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DipositivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DipositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
