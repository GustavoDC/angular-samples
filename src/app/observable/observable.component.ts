import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})

/**
 * Docs:
 * - https://rxjs-dev.firebaseapp.com/guide/operators
 * - 
 */
export class ObservableComponent implements OnInit {

  /**
   * En este ejemplo hay un Observable y cuatro ejemplos de suscripciones.
   * 1) La suscripción tácita que se produce por el text interpolatio, que la llamaremos suscripción "one"
   * 2) Suscripción simple
   * 3) Suscripción con manejor de error y complete
   * 4) Suscripción con operators
   * 
   * Nota: en la consola vamos a ver que una primera instancia se ve activa una instancia del observer.
   * Esto se debe a que en el template existe un text interpolation del observable
   * por lo que se produce una suscripción (la llamaremos subscription one).
   * 
   * Cada vez que se genera una suscripción, se crea una nueva instancia del observer. 
   * Por lo tanto existirá en este ejemplo un setInterval para cada subscription
   */

  // para guardar las suscripciones y poder desuscribirse:
  private subscription_two: any;
  private subscription_three: any;
  private subscription_four: any;

  // para guardar los resultados de las suscripciones e imprimirlas en el template
  // La suscripción one la imprimirmos directamente con el Observable
  private message_two: string;
  private message_three: string;
  private message_four: string;

  showOnTemplate: boolean = false;
  instanceCount = 0;
  
  /**
   * Declaramos el Observable.
   * Existe una convención de agregar $ al final del nombre de los observables para identidicarlos
   * y sin el $ si existe una propiedad paralela que guarda su valor
   */
  private myIntervalObservable$: Observable<string> = new Observable( 

    observer => {

      // Es buena práctica poner toda la lógica dentro de un try/catch para atrapar errores
      try {
        // esta variable se incrementa cada vez que se genera una suscripcion
        this.instanceCount++;

        let instance = this.instanceCount;
        
        // inicializa contador interno
        let count = 1;

        // crea un interval que se ejecuta cada 1 segundo
        var interval = setInterval( () => {

          let names = ['One', 'Two', 'Three'];

          // emite un resultado como salida del observable. En este caso tiene que ser un string
          observer.next(names[Math.floor(Math.random()*names.length)]);
          
          // controlamos si la instancia del observer está activa
          console.log('Interval ', instance, count++);

          // crea un error artificial cuando llega a 10 o un complete (elegir)
          if (count >= 10) {
            //observer.error('Se produjo un error en el observer');
            observer.complete();
          }

        }, 1000  );

      } catch (err) {

        // llama a la función de error definida en el subscribe
        observer.error(err);

      }

      /**
       * Esta función (return) se ejecuta automáticamente en el unsubscribe.
       * Si comoentamos el clearInterval() veremos que el log dentro de los observers
       * sigue activo aunque se haya desuscripto.
       */
      return () => {
        clearInterval(interval);
      }

    } 
  );
  

  constructor() {    }

  ngOnInit() {
  }

  /**
   * Si se elimina el div que contiene el string interpolation del observable, veremos que se elimina
   * el instance del observer creado por este.
   */
  onToggleMessage() {
    this.showOnTemplate = !this.showOnTemplate;
  }

  /**
   * Subscription TWO: suscripción simple
   */
  onSubscribeTwo() {
    this.subscription_two = this.myIntervalObservable$
      .subscribe(
        // callback que se ejecuta cuando el observer envía un resultado.
        // Si tuviera una sola línea no hacen falta las llaves.
        value => {
          console.log('Observable 2: ', value);
          this.message_two = value;
        }    
      );
  }
  onUnsubscribeTwo() {
    this.subscription_two.unsubscribe();
  }

  /**
   * Subscription THREE: se definen error and complete
   * para poder manejar las llamadas a error() y complete() dentro del observer.
   * En los otros subscribes muestra directamente el error crudo y en el complete no muestra nada.
   * También puede produce un error en el cuarto evento (ver pipe comentado).   
   */
  onSubscribeThree() {
    this.subscription_three = this.myIntervalObservable$
      // En caso de querer generar un error desde el pipe
      /*.pipe(
        map( (value, index) => {
          if (index > 3)
            throw new Error('Se produjo un error!');
          else
            return value;
        })
      )*/
      .subscribe( 
        value => 
        {
          console.log('Observable 3: ', value);
          this.message_three = value;
        },
        error => {
          console.log("OBSERVABLE 3 - Error manejado por error handler en subscriber: " + error);
        },
        () => {
          console.log("OBSERVABLE 3 - COMPLETADO");

        }
      );
  }
  onUnsubscribeThree() {
    this.subscription_three.unsubscribe();
  }

  /**
   * Suscripción FOUR: con operators
   */
  onSubscribeFour() {
    this.subscription_four = this.myIntervalObservable$
      .pipe(

        // solo visualiza el valor y hace algo, pero no lo modifica, devuelve lo mismo que entra.
        tap( value => {
          if (value === 'One') console.log("Observable 4: ES UN UNO!");
        }),

        // si la condición se cumple sigue la cadena, sino se interrumpe
        // En este caso interrumpe si es "One" (solo deja pasar los otros valores)
        filter( value => value !== "One"),

        // realizar algún cambio al valor. Notar que en esta notación, cuando hay una solo línea de código
        // y no se usan llaves, el return se realiza automáticamente.
        map( (value, index) => index + ') ' + value + "!!!"),

      )
      .subscribe( 
        value => {
          console.log('Observable 4: ', value)
          this.message_four = value;
        }
      );
  }
  onUnsubscribeFour() {
    this.subscription_four.unsubscribe();
  }



}
