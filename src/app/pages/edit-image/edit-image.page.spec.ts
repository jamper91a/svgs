import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditImagePage } from './edit-image.page';

describe('EditImagePage', () => {
  let component: EditImagePage;
  let fixture: ComponentFixture<EditImagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
