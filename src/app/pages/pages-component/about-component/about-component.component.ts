import { Component, OnInit } from '@angular/core';
import { DbListService } from '../core/db-list.service';
import { database } from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-about-component',
  templateUrl: './about-component.component.html',
  styleUrls: ['./about-component.component.css']
})
export class AboutComponentComponent implements OnInit {
  items: Observable<any>;
  constructor (private dbList: DbListService) { }
  ngOnInit() {
    this.items = this.dbList.items;
  }
}
