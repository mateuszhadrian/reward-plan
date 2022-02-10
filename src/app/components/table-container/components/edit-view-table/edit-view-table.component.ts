import { AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-edit-view-table',
  templateUrl: './edit-view-table.component.html',
  styleUrls: ['./edit-view-table.component.css']
})
export class EditViewTableComponent implements OnChanges {
  tableValuesArray: any[];
  tableRowForm: FormGroup;
  productInProgress: string;
  tableValuesArrayTop;
  tableValuesArrayBottom;
  initValuesForRow = {
    product: null,
    threshold_from: 0,
    threshold_to: 0,
    criteria: null,
    percentage: 0
  }

  @Output()
  goToNextRow = new EventEmitter<any>()

  @Output()
  closeEditMode = new EventEmitter<any>()


  @Input()
  editedRow

  constructor(
    private tableService: TableService
  ){}

ngOnChanges(): void {
  this.tableService.prepareArraysToEditMode(this.editedRow);
  this.setEditModeArrays();
  this.setInitValuesForRow();


this.tableRowForm = new FormGroup({
  'threshold_from': new FormControl(this.initValuesForRow.threshold_from),
  'threshold_to': new FormControl(this.initValuesForRow.threshold_to),
  'criteria': new FormControl(this.initValuesForRow.criteria),
  'percentage': new FormControl(this.initValuesForRow.percentage),
})

}

setEditModeArrays(){
  this.tableValuesArrayTop = this.tableService.tableValuesArrayTop;
  this.tableValuesArrayBottom = this.tableService.tableValuesArrayBottom;
}

setInitValuesForRow(){

  this.initValuesForRow = {
    product: this.tableService.tableValuesArray[this.editedRow - 1].product,
    threshold_from: this.tableService.tableValuesArray[this.editedRow - 1].threshold_from,
    threshold_to: this.tableService.tableValuesArray[this.editedRow - 1].threshold_to,
    criteria: this.tableService.tableValuesArray[this.editedRow - 1].criteria,
    percentage: +this.tableService.tableValuesArray[this.editedRow - 1].percentage.substring(0, this.tableService.tableValuesArray[this.editedRow - 1].percentage.length - 1)
  }

}

onConfirmAction(){
    this.setValuesFromControlsToRow();

  if (this.tableService.tableValuesArray[this.editedRow - 1].actions === 'DELETE') {
      this.closeEditMode.emit(false);
  }
  
}

setValuesFromControlsToRow(){
  const newValuesForRow = {
    isFirstTierRow: this.tableService.tableValuesArray[this.editedRow - 1].isFirstTierRow,
    rowNumber: this.tableService.tableValuesArray[this.editedRow - 1].rowNumber,
    product: this.tableService.tableValuesArray[this.editedRow - 1].product,
    threshold_from: this.tableRowForm.controls.threshold_from.value,
    threshold_to: this.tableRowForm.controls.threshold_to.value,
    criteria: this.tableRowForm.controls.criteria.value,
    percentage: this.tableRowForm.controls.percentage.value + '%',
    actions: this.tableService.tableValuesArray[this.editedRow - 1].actions
  }

  this.tableService.tableValuesArray[this.editedRow - 1] = newValuesForRow;
  this.tableService.prepareArraysToEditMode(this.editedRow);
  this.goToNextRow.emit(parseInt(this.editedRow) + 1)
}

  
}
