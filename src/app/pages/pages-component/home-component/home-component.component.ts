import {Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { httpService } from '../core/http.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  url: string;
  postData = [];
  startedClass = false;
  completedClass = false;
  preventAbuse = false;
  flag = true;
  hideImg = false;
  
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder, private http: Http, private changeDetectorRef: ChangeDetectorRef, private httpService: httpService) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      file: null
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('file', this.form.get('file').value);
    return input;
  }
  // http://my-dyplom.ddns.net/
  onSubmit() {
    if(this.url) {
      const formModel = this.prepareSave();
      this.loading = true;
      this.http.post('http://195.201.129.41:8001/', formModel).subscribe( data => {
        this.saveData(data);
        if(this.postData[0].data) {
          this.hideImg = true;
        }
      });
      setTimeout(() => {
        alert ("Send!")
        this.loading = false;
      }, 1000);
    } else {
      alert ("Select an image!");
    }
  }

  saveData(data) {
    const res = data.json();
    this.flag = false;
    return this.postData.push(res);
  }

  clearFile() {
    this.form.get('file').setValue(null);
    this.fileInput.nativeElement.value = '';
    this.url = "";
  }
  
  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit(){
    
  }
}