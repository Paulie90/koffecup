import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ImageDirective } from './image.directive';
import { ImageModel } from '../images.model';

describe('Directive: appImage', () => {
  let directive: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDirective]
    }).compileComponents();

    directive = TestBed.configureTestingModule({
      declarations: [ImageDirective, TestComponent]
    }).createComponent(TestComponent);

    directive.detectChanges();
  });

  it('should init the directive', () => {
    const des = directive.debugElement.query(By.directive(ImageDirective));

    expect(des.nativeElement.style.backgroundImage).toEqual('url("https://via.placeholder.com/150/1ee8a4")');
  });
});

@Component({
  template: `
  <div [appImage]="image">
    <div class="spinner"></div>
  </div>`
})
class TestComponent {
  image: ImageModel = {
    albumId: 1,
    id: 11,
    title: 'nihil at amet non hic quia qui',
    url: 'https://via.placeholder.com/600/1ee8a4',
    thumbnailUrl: 'https://via.placeholder.com/150/1ee8a4'
  };
}
