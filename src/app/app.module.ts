import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PromiseComponent } from './promise/promise.component';
import { ObservableComponent } from './observable/observable.component';
import { TestsComponent } from './tests/tests.component';
import { SubjectComponent } from './subject/subject.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CrossCommunicationComponent } from './cross-communication/cross-communication.component';
import { SenderComponent } from './cross-communication/sender/sender.component';
import { ReceiverComponent } from './cross-communication/receiver/receiver.component';

@NgModule({
  declarations: [
    AppComponent,
    PromiseComponent,
    ObservableComponent,
    TestsComponent,
    SubjectComponent,
    HomeComponent,
    HeaderComponent,
    CrossCommunicationComponent,
    SenderComponent,
    ReceiverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
