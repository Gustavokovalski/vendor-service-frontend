import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormAdminComponent } from './user-form-admin.component';

describe('UserFormAdminComponent', () => {
  let component: UserFormAdminComponent;
  let fixture: ComponentFixture<UserFormAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormAdminComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
