import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { TableValuesArrayDto } from '../dto/table-values-array.dto';

@Component({
  selector: 'app-edit-view-table',
  templateUrl: './edit-view-table.component.html',
  styleUrls: ['./edit-view-table.component.css']
})
export class EditViewTableComponent implements OnChanges {
  tableValuesArray: TableValuesArrayDto[];
  tableRowForm: FormGroup;
  productInProgress: string;
  tableValuesArrayTop: TableValuesArrayDto[];
  tableValuesArrayBottom: TableValuesArrayDto[];
  initValuesForRow: Partial<TableValuesArrayDto> = {
    product: null,
    threshold_from: 0,
    threshold_to: 0,
    criteria: null,
    percentage: '0'
  }

  @Output()
  goToNextRow = new EventEmitter<number>()

  @Output()
  closeEditMode = new EventEmitter<boolean>()

  @Input()
  editedRow: number

constructor(private tableService: TableService){}

ngOnChanges(): void {
  this.tableService.prepareArraysToEditMode(this.editedRow);
  this.setEditModeArrays();
  this.setInitValuesForRow();


this.tableRowForm = new FormGroup({
  'threshold_from': new FormControl(this.initValuesForRow.threshold_from),
  'threshold_to': new FormControl(this.initValuesForRow.threshold_to),
  'criteria': new FormControl(this.initValuesForRow.criteria),
  'percentage': new FormControl(+this.initValuesForRow.percentage),
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
    percentage: this.tableService.tableValuesArray[this.editedRow - 1].percentage.substring(0, this.tableService.tableValuesArray[this.editedRow - 1].percentage.length - 1)
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
    this.goToNextRow.emit(+this.editedRow + 1)
  }
}
