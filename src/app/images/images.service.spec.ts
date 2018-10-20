import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';

import { ImagesService } from './images.service';
import { ImageModel } from './images.model';

describe('Service: ImagesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ImagesService,
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = new ImagesService(httpClient);
  });

  describe('Method: getImages', () => {
    let mockedRequest: TestRequest;
    const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
    const response: Array<ImageModel> = [
      {
        albumId: 1,
        id: 11,
        title: 'nihil at amet non hic quia qui',
        url: 'https://via.placeholder.com/600/1ee8a4',
        thumbnailUrl: 'https://via.placeholder.com/150/1ee8a4'
      },
      {
        albumId: 1,
        id: 12,
        title: 'mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores',
        url: 'https://via.placeholder.com/600/66b7d2',
        thumbnailUrl: 'https://via.placeholder.com/150/66b7d2'
      }
    ];

    it('should get the image list', () => {
      service.getImages().subscribe((images: Array<ImageModel>) => {
        expect(images.length).toEqual(2);
      });

      mockedRequest = httpTestingController.expectOne(`${url}?_start=0&_end=10`);

      mockedRequest.flush(response);
      httpTestingController.verify();
    });
  });
});
