import { Component, OnInit, ViewChildren } from '@angular/core';
import { DbListService } from '../core/db-list.service';
import { database } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { httpService } from '../core/http.service';
import { galleryModel } from '../core/modelSettings';

@Component({
  selector: 'app-gallery-component',
  templateUrl: './gallery-component.component.html',
  styleUrls: ['./gallery-component.component.css']
})
export class GalleryComponentComponent implements OnInit {
  showSpinner: boolean = true;
  _galleryData: any[];


  constructor(private dbList: DbListService,
              private httpService: httpService            
  ) { }
  
  showData():void {
    this.httpService.getData().subscribe(
      resultArray => this._galleryData = resultArray,
      error => console.log("Error :: " + error)
    );
  }

  ngOnInit() {
    this.httpService.getData().subscribe(() => this.showSpinner = false);
    this.showData();
  }
}
