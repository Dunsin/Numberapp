import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatViewPage } from './chat-view';

@NgModule({
  declarations: [
    ChatViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatViewPage),
  ],
  exports: [
    ChatViewPage
  ]
})
export class ChatViewPageModule {}
