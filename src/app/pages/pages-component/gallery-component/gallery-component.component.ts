import { Component, OnInit, ViewChildren } from '@angular/core';
import { DbListService } from '../core/db-list.service';
import { database } from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-gallery-component',
  templateUrl: './gallery-component.component.html',
  styleUrls: ['./gallery-component.component.css']
})
export class GalleryComponentComponent implements OnInit {

  showSpinner: boolean = true;

  mushrooms: Observable<any[]>;
  constructor(private dbList: DbListService) { }
  
  ngOnInit() {
    this.dbList.getShrooms().subscribe( data => this.mushrooms = data);
    this.dbList.getShrooms().subscribe(() => this.showSpinner = false);
  }

}
