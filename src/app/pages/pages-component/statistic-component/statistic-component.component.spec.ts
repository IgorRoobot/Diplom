import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticComponentComponent } from './statistic-component.component';

describe('StatisticComponentComponent', () => {
  let component: StatisticComponentComponent;
  let fixture: ComponentFixture<StatisticComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
