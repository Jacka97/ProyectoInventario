import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsersComponent } from './lista.component';

describe('ListaUsersComponent', () => {
  let component: ListaUsersComponent;
  let fixture: ComponentFixture<ListaUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
