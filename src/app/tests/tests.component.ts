import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  testObservable: Observable<number> = new Observable(
    observer => {

      let i = 1;

      setInterval(
        () => {
          observer.next(i++);
        }, 1000
      );

    }
   );

  constructor() { }

  ngOnInit() {

    this.testObservable.subscribe( value => {
      console.log("Test: ", value);
    } )

  }

}
