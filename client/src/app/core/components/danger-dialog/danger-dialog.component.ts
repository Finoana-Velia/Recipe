import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogResponse } from '../../models/DialogResponse';

@Component({
  selector: 'app-danger-dialog',
  imports: [],
  templateUrl: './danger-dialog.component.html',
  styleUrl: './danger-dialog.component.css'
})
export class DangerDialogComponent {

 @Input() isOpen! : boolean;
 @Input() id! : number;
 @Output() dialogResponse = new EventEmitter<DialogResponse>();

 emitResponse(state : boolean, response : boolean) {
  if(this.id) {
    this.dialogResponse.emit({
      id : this.id,
      state : state,
      response : response
    });
  }else {
    alert("id : " + this.id + " not found");
  }
 }

}
