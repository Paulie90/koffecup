import { Directive, ElementRef, EventEmitter, Input, OnInit, Renderer2 } from '@angular/core';
import { debounceTime, filter } from 'rxjs/operators';

@Directive({
  selector: '[appImage]',
})
export class ImageDirective implements OnInit {
  isLoaded: boolean;

  @Input() imageURL: string;
  @Input() thumbnailURL: string;
  @Input() imageWidth: number = 200;
  @Input() imageHeight?: number;
  @Input() scrollPositionEvent?: EventEmitter<number>;

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

    // load the image if it's in the viewport at the beginning
    if (directiveElement.offsetTop < window.innerHeight) {
      this.loadFullImage(imageHelperElement);
    }

    // Subscrbe to scroll event
    if (this.scrollPositionEvent) {
      this.scrollPositionEvent
        .pipe(
          filter(() => !this.isLoaded),
          debounceTime(300)
        ).subscribe(scrollPosition => {
          const viewportBottomPosition = scrollPosition + window.innerHeight;

          if (directiveElement.offsetTop < viewportBottomPosition) {
            this.loadFullImage(imageHelperElement);
          }
        });
    }
  }

  loadFullImage(imageHelperElement: HTMLImageElement): void {
    this.renderer.setAttribute(imageHelperElement, 'src', this.imageURL);
    this.isLoaded = true;
  }
}
