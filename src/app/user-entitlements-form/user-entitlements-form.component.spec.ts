import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntitlementsFormComponent } from './user-entitlements-form.component';

describe('UserEntitlementsFormComponent', () => {
  let component: UserEntitlementsFormComponent;
  let fixture: ComponentFixture<UserEntitlementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEntitlementsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEntitlementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
