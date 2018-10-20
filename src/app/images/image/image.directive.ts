import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { ImageModel } from '../images.model';

@Directive({
  selector: '[appImage]',
})
export class ImageDirective implements OnInit {
  @Input() appImage: ImageModel;

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    const nativeElement = this.element.nativeElement;

    nativeElement.style.backgroundImage = `url(${this.appImage.thumbnailUrl})`;
    const image = new Image();

    image.onload = () => {
      nativeElement.style.backgroundImage = `url(${image.src})`;
      nativeElement.firstChild.hidden = true;
    };
    image.src = this.appImage.url;
  }
}
