import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ImagesComponent } from './images.component';
import { ImageComponent } from './image/image.component';
import { ImageDirective } from './image/image.directive';
import { ImagesService } from './images.service';
import { routes } from '../app-routing.module';

describe('Component: appImages', () => {
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [ImagesComponent, ImageComponent, ImageDirective],
      providers: [ImagesService]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance;
  });

  it('should init the component', fakeAsync(() => {
    const imagesService = TestBed.get(ImagesService);

    spyOn(imagesService, 'getImages').and.callThrough();
    // tslint:disable-next-line:no-life-cycle-call
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.imageList$.constructor.name).toEqual('Observable');
    component.imageForm.setValue({ offset: '3', limit: '50' });
    tick(350);

    expect(imagesService.getImages).toHaveBeenCalledWith('3', '50');
  }));
});
