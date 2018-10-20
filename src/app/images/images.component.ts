import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ImageModel } from './images.model';
import { ImagesService } from './images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  imageList$: Observable<Array<ImageModel>>;

  constructor(
    private route: ActivatedRoute,
    private imagesService: ImagesService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;

    this.imageList$ = this.imagesService.getImages(routeParams.offset, routeParams.limit);
  }
}
