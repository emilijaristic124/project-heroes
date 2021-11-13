import { Component, Input, OnInit } from '@angular/core';
import { HeroeModel } from '../heroes/heroe-model';


@Component({
  selector: 'app-one-heroe',
  templateUrl: './one-heroe.component.html',
  styleUrls: ['./one-heroe.component.scss'],
})
export class OneHeroeComponent implements OnInit {
  @Input() heroe: HeroeModel = {id: "id9",name:"ime 9",picture:"",damage:99,health:999,userId:'xx'};
  constructor() { }

  ngOnInit() {}

}
