import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPerifeComponent } from './lista.component';

describe('ListaComponent', () => {
  let component: ListaPerifeComponent;
  let fixture: ComponentFixture<ListaPerifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPerifeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPerifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
