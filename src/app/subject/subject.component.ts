import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  /**
   * Creación del Subject. No lleva parámetros.
   * El observer es creado en el subscribe(), por lo que un subject puede tener muchos observers diferentes,
   * mientras que un Observable solamente tiene uno.
   */
  private subject: Subject<number> = new Subject();
  private counter = 0;

  constructor() { }

  ngOnInit() {

    /* Primer observer: muestra valor original */
    this.subject.subscribe( value => { console.log('Observer A: ' + value); } );
    
    /* Segundo observer: multiplica por dos */
    this.subject.subscribe( value => { console.log('Observer B: ' + value * 2); } );

    /* Tercer observer: solo muestra valores originales pares */
    this.subject.pipe( filter( value => value % 2 === 0 ) ).subscribe( value => { console.log('Observer C: ' + value); } );

    /* Cada un segundo llama a next enviándole un número */
    setInterval( 
      () => {
        this.subject.next(this.counter++);
      },
      1000
    );

  }

  onSend() {
    this.subject.next(100);
  }

}
