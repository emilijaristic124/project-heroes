import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-heroe-modal',
  templateUrl: './heroe-modal.component.html',
  styleUrls: ['./heroe-modal.component.scss'],
})
export class HeroeModalComponent implements OnInit {

  @ViewChild('f',{static:true}) form:NgForm;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss();
  }

  addHeroe(){
    this.modalCtrl.dismiss({
      heroeData:
      {
        name:this.form.value['name'],
        picture:this.form.value['picture'],
        health:this.form.value['health'],
        damage:this.form.value['damage']
      }
    },'confirm');
  }
}
