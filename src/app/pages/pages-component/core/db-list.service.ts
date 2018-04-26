import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { of } from 'rxjs/observable/of';
import { galleryModel } from './modelSettings';

@Injectable()
export class DbListService {
  private mushroomsCollection: AngularFirestoreCollection<galleryModel>;
  user: Observable<firebase.User>;
  items: Observable<any[]>;
  // mushrooms: any;
  // shroomColl = [];
  myDb: any;

  constructor(public afAuth: AngularFireAuth, db: AngularFirestore) {
      this.afAuth.auth.signInAnonymously();
      this.user = this.afAuth.authState;
      this.items = db.collection('items').valueChanges();
      // this.mushroomsCollection = db.collection<galleryModel>('mushrooms', data => data.orderBy('name'));
      // this.mushrooms = this.mushroomsCollection.valueChanges().subscribe(items=> this.shroomColl = items);
      // console.log(this.shroomColl);
      this.myDb = db;
  }

  getShrooms () {
    return this.myDb.collection('mushrooms', data => data.orderBy('name')).valueChanges();
  } 
  getShroomsTest () {
    return this.myDb.collection('mushrooms', data => data.orderBy('name')).valueChanges().subscribe(value=>value);
  } 
}
