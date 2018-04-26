import { Component, OnInit, Input, AfterViewInit  } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { DbListService } from '../core/db-list.service';
import { database } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { galleryModel } from '../core/modelSettings'
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.css']
})
export class ProdDetailsComponent implements OnInit, AfterViewInit  {
  private dbConf: AngularFirestoreCollection<galleryModel>;
  docId: Observable<any[]>;
  idArr = [];
  formData: galleryModel;
  showSpinner: boolean = true;

  constructor(private route: ActivatedRoute, private dbList: DbListService, private afs: AngularFirestore) { 
    this.dbConf = this.afs.collection('mushrooms');

    this.docId = this.dbConf.snapshotChanges().map( changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as galleryModel;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });

    this.docId.subscribe( docs => {
      docs.forEach(doc => {
        this.idArr.push(doc);
        this.route.params.subscribe(par => this.formData = this.idArr.filter(el => el.id.toString() == par.id)[0] );
      });
    });
    
    
    
  }

  ngOnInit() {
    this.docId.subscribe(() => this.showSpinner = false);
  }

  ngAfterViewInit () {

  }

}
