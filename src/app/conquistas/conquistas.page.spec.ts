import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConquistasPage } from './conquistas.page';

describe('ConquistasPage', () => {
  let component: ConquistasPage;
  let fixture: ComponentFixture<ConquistasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConquistasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
