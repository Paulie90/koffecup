import { Component, Input } from '@angular/core';

import { ImageModel } from '../images.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() image: ImageModel;
}
