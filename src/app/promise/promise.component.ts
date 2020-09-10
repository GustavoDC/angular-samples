import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: []
})
export class PromiseComponent implements OnInit {

  myPromise: Promise<string> = new Promise( resolve => {
    setTimeout( () => resolve("4 segundos han pasado"), 4000 );
  } );

  /* Si no hago click lo imprime en template pero no loguea */
  onClick() {
    this.myPromise.then( value => console.log('Promise:', value) );
  }

  constructor() { }

  ngOnInit() {
  }

}
