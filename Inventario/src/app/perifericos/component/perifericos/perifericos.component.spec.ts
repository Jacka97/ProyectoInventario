import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerifeComponent } from './perifericos.component';

describe('PerifericosComponent', () => {
  let component: PerifeComponent;
  let fixture: ComponentFixture<PerifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerifeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
