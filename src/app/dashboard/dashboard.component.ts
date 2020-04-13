import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  states: any;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getData();

  }

  getData() {
    this.api.getData().subscribe(
      (data:any) => {
        console.log(data);

        this.states = data.data.regional;
      }
    )
  }

}
