import { Component } from '@angular/core';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css']
})
export class TableContainerComponent {
isEditMode: boolean = false;
editedRow: number

setEditMode(rowNumber: number): void{
  this.isEditMode = true;
  this.editedRow = rowNumber
}

changeEditedRow(nextEditedRow: number): void{
  this.editedRow = nextEditedRow
}

closeEditMode(isEditMode: boolean): void{
  this.isEditMode = isEditMode
  }
}
