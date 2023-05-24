import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{

  constructor(private route: ActivatedRoute) { }
  Name : any;
  Email  :any;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
       this.Name = params['Name']; 
       this.Email = params['Email'];
    });
  }
  
}
