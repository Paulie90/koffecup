import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ImageModel } from './images.model';

@Injectable()
export class ImagesService {
  private IMAGE_URL = 'https://jsonplaceholder.typicode.com/albums/1/photos';

  constructor(
    private http: HttpClient
  ) { }

  getImages(offset: string = '0', limit: string = '10'): Observable<Array<ImageModel>> {
    return this.http.get<Array<ImageModel>>(this.IMAGE_URL, {
      params: {
        _start: offset,
        _limit: limit
      },
    });
  }
}
