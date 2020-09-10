import { Component, OnInit } from '@angular/core';
import { SenderService } from 'src/app/services/sender.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent {

  constructor(private sender:SenderService) { }

  onSend() {
    this.sender.itemSent.next(1);
  }

}
