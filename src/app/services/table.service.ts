import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  tableValuesArrayTop = [];
  tableValuesArrayBottom = []

  tableValuesArray = [
    {
      isFirstTierRow: true,
      rowNumber: 1,
      product: 'Casino',
      threshold_from: 0,
      threshold_to: 10.0,
      criteria: 'Net revenue',
      percentage: '10%' ,
      actions: ''
    },
    {
    isFirstTierRow: false,
    rowNumber: 2,
    product: 'Casino',
    threshold_from: 10.1,
    threshold_to: 100.0,
    criteria: 'Net revenue',
    percentage: '20%' ,
    actions: 'DELETE'
  },
  {
    isFirstTierRow: true,
    rowNumber: 3,
    product: 'Lotto',
    threshold_from: 0,
    threshold_to: 10.0,
    criteria: 'Turnover',
    percentage: '5%' ,
    actions: 'DELETE'
  }
  ]

  prepareArraysToEditMode(editedRow){
this.tableValuesArrayTop = this.tableValuesArray.slice(0, editedRow - 1);
this.tableValuesArrayBottom = this.tableValuesArray.slice(editedRow);
  }

  onDeleteItem(itemRow: HTMLElement){
    const productName = itemRow.childNodes[0].firstChild.nodeValue;
    this.tableValuesArray = this.tableValuesArray.filter(row => row.product !== productName);
    return this.tableValuesArray
    }

}
