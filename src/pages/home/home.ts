import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import { Refresher, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio();
  audioTiempo:any;
  ordernar:boolean=false;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproducir( animal:Animal ) {
    this.pausarAudio(animal);
    if(animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;
    this.audioTiempo = setTimeout( ()=> animal.reproduciendo=false,
                                        animal.duracion*1000 );
  }

  borrarAnimal(index:number){
    this.animales.splice(index,1);
  }

  refrescarLista(refresher:Refresher) {
    setTimeout(()=>{
        this.animales = ANIMALES.slice(0);
        refresher.complete();
    },
    1500);

  }

  reordenasAnimales(indices:any) {
    this.animales = reorderArray(this.animales, indices);
  }

  private pausarAudio( animalSelec:Animal ) {
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;
    for(let animal of this.animales){
      if(animalSelec.nombre != animal.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

}
