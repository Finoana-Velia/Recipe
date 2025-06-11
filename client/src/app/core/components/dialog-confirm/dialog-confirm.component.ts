import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogResponse } from '../../models/DialogResponse';

@Component({
  selector: 'app-dialog-confirm',
  imports: [],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.css'
})
export class DialogConfirmComponent {

  @Input() isOpen! : boolean;
  @Input() id! : number;
  @Output() dialogResponse = new EventEmitter<DialogResponse>();

  emitResponse(state : boolean, response : boolean) {
    if(this.id) {
      this.dialogResponse.emit({
        id : this.id,
        state : state,
        response : response,
      });
    }
  }
}
