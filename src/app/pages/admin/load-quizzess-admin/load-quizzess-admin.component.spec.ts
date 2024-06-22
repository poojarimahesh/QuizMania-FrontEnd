import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadQuizzessAdminComponent } from './load-quizzess-admin.component';

describe('LoadQuizzessAdminComponent', () => {
  let component: LoadQuizzessAdminComponent;
  let fixture: ComponentFixture<LoadQuizzessAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadQuizzessAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadQuizzessAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
