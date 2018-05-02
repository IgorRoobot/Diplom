import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { galleryModel } from './modelSettings';
import "rxjs/Rx";

@Injectable()
export class httpService {
    apiRoot: string = "http://195.201.129.41:8001";
    url = `${this.apiRoot}/mushrooms/`;

    constructor (private http: Http) { }

    getData(): Observable<any[]> {
        return this.http
            .get(this.url)
            .map((response: Response) => {
                return <any[]>response.json();
            });
    }
}