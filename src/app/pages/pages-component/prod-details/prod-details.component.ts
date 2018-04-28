import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DbListService } from '../core/db-list.service';
import { database } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { galleryModel } from '../core/modelSettings'
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { httpService } from '../core/http.service';

@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.css']
})
export class ProdDetailsComponent implements OnInit {
  showSpinner: boolean = true;
  _galleryData: any[];
  formData: any;

  constructor(private httpService: httpService,
              private dbList: DbListService,
              private route: ActivatedRoute) { }

  showData():void {
    this.httpService.getData().subscribe(
      resultArray => {
        this._galleryData = resultArray;
        this.route.params.subscribe(par => this.formData = this._galleryData.filter(el => el.data.id.toString() == par.id)[0] );
      },
      error => console.log("Error :: " + error)
    );
  }
  
  ngOnInit() {
    this.httpService.getData().subscribe(() => this.showSpinner = false);
    this.showData();
  }
}
