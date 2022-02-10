import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';


@Component({
  selector: 'app-standard-view-table',
  templateUrl: './standard-view-table.component.html',
  styleUrls: ['./standard-view-table.component.css']
})
export class StandardViewTableComponent implements OnInit, AfterViewInit {
  tableValuesArray: any[];
  tableRowForm: FormGroup;
  productInProgress: string;
  lastRowNumber: number = 3;

  @Output()
  onClickOnRow = new EventEmitter<any>()

  constructor(
    private tableService: TableService
  ){}

ngOnInit(): void {
this.tableRowForm = new FormGroup({
  'product': new FormControl(null),
  'threshold_from': new FormControl(0),
  'threshold_to': new FormControl(0),
  'criteria': new FormControl(null),
  'percentage': new FormControl(0),
  'actions': new FormControl(null)
})

this.tableValuesArray = this.tableService.tableValuesArray
    this.setProductInProgress();

}

ngAfterViewInit(): void {
    this.addEventListenersToRows();

}

onAddAction(){
  if (this.tableService.tableValuesArray[this.tableService.tableValuesArray.length-1]?.product === this.tableRowForm.controls.product.value) {
    this.tableService.tableValuesArray[this.tableValuesArray.length-1].actions = '';
  }
    
  this.tableService.tableValuesArray.push(
    { 
      isFirstTierRow: this.tableService.tableValuesArray[this.tableValuesArray.length - 1].product !== this.tableRowForm.controls.product.value,
      rowNumber: this.tableValuesArray[this.tableValuesArray.length - 1].rowNumber + 1,
      product: this.tableRowForm.controls.product.value,
      threshold_from: this.tableRowForm.controls.threshold_from.value,
      threshold_to: this.tableRowForm.controls.threshold_to.value,
      criteria: this.tableRowForm.controls.criteria.value,
      percentage: this.tableRowForm.controls.percentage.value + '%',
      actions: 'DELETE'
    })
  this.setProductInProgress();
  this.addEventListenersToRows();

  
}

addEventListenersToRows(){
  this.tableService.tableValuesArray.forEach((row, i) => {
    const rowAsElement = document.getElementById((i+1).toString())
    if ((rowAsElement?.getAttribute('listener') !== 'true') && row.isFirstTierRow) {
      rowAsElement?.setAttribute('listener', 'true')
      rowAsElement?.addEventListener('click', (e) => {
        this.onClickOnRow.emit(rowAsElement.id);
        e.stopPropagation()
      });
    }

  })
}


setProductInProgress(){
  this.productInProgress = this.tableValuesArray[this.tableValuesArray.length-1].product
}

checkIfProductExists(currentProduct){
  const existingProductArray = []
  this.tableService.tableValuesArray.forEach(row => {
    existingProductArray.push(row.product)
  })
  return existingProductArray.includes(currentProduct)
  
}

onDeleteItem(itemRow: HTMLElement, e){
e.stopPropagation();
this.tableValuesArray = this.tableService.onDeleteItem(itemRow)
}
}
