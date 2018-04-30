import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DbListService } from '../core/db-list.service';
import { galleryModel } from '../core/modelSettings'
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { httpService } from '../core/http.service';
import { SData } from '../statistic-component/data.interface';
import { database } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import * as D3 from "d3";

@Component({
  selector: 'app-prod-details',
  templateUrl: './prod-details.component.html',
  styleUrls: ['./prod-details.component.css']
})
export class ProdDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild("detailPieChart") element: ElementRef;

  showSpinner: boolean = true;
  _galleryData: any[];
  formData: any;
  pieArray = [];
  pieValue = [];
  flag = 0;
  pieLocation = [
    {label: "forest_steppe", value: ""},
    {label: "mixed_forests", value: ""},
    {label: "mountains", value: ""},
    {label: "steppe", value: ""}
  ];
  topLevelArray = [];
  private host: D3.Selection;
  private svg: D3.Selection;
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  private pieData: any[];
  sData: any[];
  newLabel: string;
  newValue: number;
  colors = ["#6f2a6f", "#e68a00", "#009999", "#004d00"];
  constructor(private httpService: httpService,
              private dbList: DbListService,
              private route: ActivatedRoute) { }

  showData():void {
    this.httpService.getData().subscribe(
      resultArray => {
        this._galleryData = resultArray;
        this.route.params.subscribe(par => this.formData = this._galleryData.filter(el => el.data.id.toString() == par.id)[0] );
        this.pieArray.push(this.formData.full);
        this.pieArray.filter(res => {
          this.pieValue.push(res.forest_steppe, res.mixed_forests, res.mountains, res.steppe);
          this.pieValue.map(val => {
            this.pieLocation[this.flag].value = val;
            this.flag++;
          });
        });
        this.topLevelArray.push(this.pieLocation);
        this.htmlElement = this.element.nativeElement;
    console.log(this.htmlElement);
    this.topLevelArray.map(res=>console.log(res));
    this.host = D3.select(this.htmlElement);
    this.topLevelArray.map(data => {
      console.log(data);
      this.pieData = data;
      console.log(this.pieData);
      this.setup();
      this.buildSVG();
      this.buildPie();
      this.sData = data;
    });
    this.pieLocation.map(() => this.showSpinner = false);
      },
      error => console.log("Error :: " + error)
    );
  }
  
  ngAfterViewInit() {
    
  }

  ngOnInit() {
    this.httpService.getData().subscribe(() => this.showSpinner = false);
    this.showData();
  }

  //build a pie
  private setup(): void {
    this.width = 600;
    this.height = 600;
    this.radius = Math.min(this.width, this.height) / 2;
}

private buildSVG(): void {
    this.host.html("");
    this.svg = this.host.append("svg")
        .attr("viewBox", `0 0 ${this.width} ${this.height}`)
        .append("g")
        .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
}

private buildPie(): void {
    let pie = D3.layout.pie();
    let values = this.pieData.map(data => data.value);
    let arcSelection = this.svg.selectAll(".arc")
        .data(pie(values))
        .enter()
        .append("g")
        .attr("class", "arc");

    this.populatePie(arcSelection);
}

private populatePie(arcSelection: D3.Selection<D3.layout.pie.Arc>): void {
    let innerRadius = this.radius - 50;
    let outerRadius = this.radius - 10;
    let pieColor = D3.scale.category20c();
    let arc = D3.svg.arc<D3.layout.pie.Arc>()
        .outerRadius(outerRadius);
    arcSelection.append("path")
        .attr("d", arc)
        .attr("fill", (datum, index) => {
            return this.colors[index % this.colors.length];
        });

    arcSelection.append("text")
        .attr("transform", (datum: any) => {
            datum.innerRadius = outerRadius - 150;
            datum.outerRadius = outerRadius;
            return "translate(" + arc.centroid(datum) + ")";
        })
        .text((datum, index) => this.pieData[index].value)
        .style("text-anchor", "middle");
}

}
