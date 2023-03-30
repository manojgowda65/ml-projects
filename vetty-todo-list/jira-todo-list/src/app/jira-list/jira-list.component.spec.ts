import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraListComponent } from './jira-list.component';

describe('JiraListComponent', () => {
  let component: JiraListComponent;
  let fixture: ComponentFixture<JiraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JiraListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JiraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
