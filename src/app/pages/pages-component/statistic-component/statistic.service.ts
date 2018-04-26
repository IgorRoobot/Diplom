import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SData } from './data.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class StatisticService {

  user: Observable<firebase.User>;
  pieData: Observable<any[]>;
  myDb: any;

  constructor(public afAuth: AngularFireAuth,db: AngularFirestore) {
      this.afAuth.auth.signInAnonymously();
      this.user = this.afAuth.authState;
      this.myDb = db;
  }
  getData () {
    return this.myDb.collection('pieData', data => data.orderBy('value')).valueChanges();
  } 
}