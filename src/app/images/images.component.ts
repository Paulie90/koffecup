import { Component, EventEmitter, HostListener, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';

import { ImageModel } from './images.model';
import { ImagesService } from './images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  imageList$: Observable<Array<ImageModel>>;
  imageForm: FormGroup;
  scrollPositionEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private imagesService: ImagesService
  ) { }

  @HostListener('window:scroll', ['$event']) onScroll(event: UIEvent): void {
    this.scrollPositionEvent.emit(window.pageYOffset);
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    // init the reactive form
    this.imageForm = this.generateForm(routeParams.offset, routeParams.limit);

    // reload the images on form changes
    this.imageList$ = this.imageForm.valueChanges
      .pipe(
        // load the initial images from route params
        startWith({ offset: routeParams.offset, limit: routeParams.limit }),
        debounceTime(300),
        distinctUntilChanged((oldValue, newValue) => JSON.stringify(oldValue) === JSON.stringify(newValue)),
        // set the new route params
        tap(formValues => this.router.navigate(['/images', formValues.offset || '0', formValues.limit || '10'])),
        // load new images with current form values
        switchMap(formValues => this.imagesService.getImages(formValues.offset, formValues.limit)),
      );
  }

  generateForm(offset: number, limit: number): FormGroup {
    return this.formBuilder.group({
      offset,
      limit
    });
  }

  imageTrack(index, image): number {
    return image ? image.id : null;
  }
}
