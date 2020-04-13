import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  states = [];
  myData = [
   
   
  ];
  type = 'PieChart';
  options = {    
    is3D:true
 };

 title;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getData();

  }

  getData() {
    this.api.getData().subscribe(
      (data: any) => {
        console.log(data);

        const tempObj = {
          loc: 'INDIA',
          confirmedCasesIndian: data.data.summary.confirmedCasesIndian,
          discharged: data.data.summary.discharged,
          deaths: data.data.summary.deaths,
          confirmedCasesForeign: data.data.summary.confirmedCasesForeign,
          totalConfirmed: data.data.summary.total
        }
        const active = data.data.summary.total - data.data.summary.discharged - data.data.summary.deaths;
        const tempArray = [
          ['Discharged', data.data.summary.discharged],
          ['Deaths', data.data.summary.deaths],
          ['Active', active]
         
        ];
        this.title = "Data For India"
        this.myData = tempArray;

        this.states = data.data.regional;
        this.states.unshift(tempObj);
      }
    )
  }

  changeData(data) {
    const active = data.totalConfirmed - data.discharged - data.deaths;
    const tempArray = [
      ['Discharged', data.discharged],
      ['Deaths', data.deaths],
      ['Active', active]
     
    ];
    this.title = "Data For "+data.loc
    this.myData = tempArray;
  }

}
