import { Component } from '@angular/core';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css']
})
export class TableContainerComponent {
isEditMode: boolean = false;
editedRow: number
  constructor() { }

setEditMode(rowNumber){
  this.isEditMode = true;
  this.editedRow = rowNumber
}

changeEditedRow(nextEditedRow){
this.editedRow = nextEditedRow
}

closeEditMode(isEditMode){
  this.isEditMode = isEditMode
}

}
