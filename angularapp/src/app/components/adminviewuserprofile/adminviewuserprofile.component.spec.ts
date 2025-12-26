import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewuserprofileComponent } from './adminviewuserprofile.component';

describe('AdminviewuserprofileComponent', () => {
  let component: AdminviewuserprofileComponent;
  let fixture: ComponentFixture<AdminviewuserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminviewuserprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewuserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
