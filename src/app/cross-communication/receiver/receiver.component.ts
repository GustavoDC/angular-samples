import { Component, OnInit } from '@angular/core';
import { SenderService } from 'src/app/services/sender.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {

  private numbers: number[] = [];

  constructor(private senderService: SenderService) {

    senderService.itemSent.subscribe(
      (value: number) => {
        this.numbers.push(value);
      }
    );

   }

  ngOnInit() {
  }

}
