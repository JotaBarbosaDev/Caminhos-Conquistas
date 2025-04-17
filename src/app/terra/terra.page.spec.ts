import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerraPage } from './terra.page';

describe('TerraPage', () => {
  let component: TerraPage;
  let fixture: ComponentFixture<TerraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
