import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientpropertiesComponent } from './clientproperties.component';

describe('ClientpropertiesComponent', () => {
  let component: ClientpropertiesComponent;
  let fixture: ComponentFixture<ClientpropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientpropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
