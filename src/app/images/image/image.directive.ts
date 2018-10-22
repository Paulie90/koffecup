import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImage]',
})
export class ImageDirective implements OnInit {
  @Input() imageURL: string;
  @Input() thumbnailURL: string;
  @Input() imageWidth: number = 200;
  @Input() imageHeight: number;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const directiveElement = this.element.nativeElement;

    // set the thumbnail background image to make the browser load it first
    this.renderer.setStyle(directiveElement, 'background-image', `url(${this.thumbnailURL})`);
    // set the image size
    this.renderer.setStyle(directiveElement, 'width', `${this.imageWidth}px`);
    this.renderer.setStyle(directiveElement, 'height', `${this.imageHeight || this.imageWidth}px`);
    // create the spinner element and append it to DOM
    const spinnerElement = this.renderer.createElement('div');

    this.renderer.addClass(spinnerElement, 'spinner');
    this.renderer.setStyle(directiveElement, 'margin', 'auto');
    this.renderer.appendChild(directiveElement, spinnerElement);
    // create the helper img Element to asynchronously load the image file
    const imageHelperElement = this.renderer.createElement('img');

    // make the browser load the full image and override the thumbnail
    this.renderer.listen(imageHelperElement, 'load', () => {
      this.renderer.setStyle(directiveElement, 'background-image', `url(${imageHelperElement.src})`);
      this.renderer.setAttribute(spinnerElement, 'hidden', 'true');
    });
    this.renderer.setAttribute(imageHelperElement, 'src', this.imageURL);
  }
}
