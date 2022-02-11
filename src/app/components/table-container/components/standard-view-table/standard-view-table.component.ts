import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { RequestBodyDto } from '../dto/request-body.dto';
import { TableValuesArrayDto } from '../dto/table-values-array.dto';


@Component({
  selector: 'app-standard-view-table',
  templateUrl: './standard-view-table.component.html',
  styleUrls: ['./standard-view-table.component.css']
})
export class StandardViewTableComponent implements OnInit, AfterViewInit {
  tableValuesArray: TableValuesArrayDto[];
  tableRowForm: FormGroup;
  productInProgress: string;
  valueForNextTierThresholdFrom: number

  @Output()
  onClickOnRow = new EventEmitter<string>()

  constructor(
    private tableService: TableService,
    private http: HttpClient
  ){}

ngOnInit(): void {
this.tableRowForm = new FormGroup({
  'product': new FormControl(null, Validators.required),
  'threshold_from': new FormControl(0, Validators.required),
  'threshold_to': new FormControl(null, [Validators.required, this.thresholdToBiggerThanThresholdTo.bind(this)]),
  'criteria': new FormControl(null, Validators.required),
  'percentage': new FormControl(0, Validators.required),
}, Validators.required)

this.tableValuesArray = this.tableService.tableValuesArray
    this.setProductInProgress();
}

ngAfterViewInit(): void {
    this.addEventListenersToRows();
}

onAddAction(){
  if (!this.isNotNextTier()) {
    this.tableRowForm.controls.threshold_from.setValue(Math.round(this.valueForNextTierThresholdFrom * 100) / 100)
  }
  
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
  this.tableRowForm.controls.threshold_to.setValue(this.tableService.tableValuesArray[this.tableService.tableValuesArray.length-1].threshold_to + 1);
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

checkIfProductExists(currentProduct: string){
  const existingProductArray: string[] = []
  this.tableService.tableValuesArray.forEach(row => {
    existingProductArray.push(row.product)
  })

  return existingProductArray.includes(currentProduct)
  
}

onDeleteItem(itemRow: HTMLElement, event: Event){
  event.stopPropagation();
  this.tableValuesArray = this.tableService.onDeleteItem(itemRow)
  }

  isNotNextTier(): boolean {
    if (this.tableValuesArray[this.tableValuesArray.length - 1].product === this.tableRowForm.controls.product.value &&
      this.tableValuesArray[this.tableValuesArray.length - 1].criteria === this.tableRowForm.controls.criteria.value){
        this.valueForNextTierThresholdFrom = this.tableValuesArray[this.tableValuesArray.length - 1].threshold_to + 0.01;
      } else {
        this.valueForNextTierThresholdFrom = 0;
        this.tableRowForm.controls.threshold_from.setValue(0);
      }
    return !(this.tableValuesArray[this.tableValuesArray.length - 1].product === this.tableRowForm.controls.product.value &&
    this.tableValuesArray[this.tableValuesArray.length - 1].criteria === this.tableRowForm.controls.criteria.value)
  }

  isMaxPercentSet(){
    return this.tableRowForm.controls.percentage.value === 100
  }

  thresholdToBiggerThanThresholdTo(control: FormControl): {[s: string]: boolean} {
  if (control.value < this.valueForNextTierThresholdFrom) {
    return {'threshold to must be bigger than threshold from': true};
  }
  return null
  }

  isNameFieldEmpty(){
    const nameInput: HTMLInputElement = document.querySelector('#name-input')
    return nameInput.value === ''
  }

  onSavePlan(){
    const nameInput: HTMLInputElement = document.querySelector('#name-input')
    if (nameInput.value === '') {
      return
    } else {
      const requestBody: RequestBodyDto = {
        name: nameInput.value,
        criteria: []
      }
  
      this.tableValuesArray.forEach(row => {
        requestBody.criteria.push({
          product: row.product,
          from: row.threshold_from,
          to: row.threshold_to,
          criterion: row.criteria,
          percentage: row.percentage
        })
      })
  
      console.log(requestBody)
    }

    // this.http.post<RequestBodyDto>('https://hadrian.com', requestBody).subscribe(response => {
    //   console.log(response)
    // })
  }
}
