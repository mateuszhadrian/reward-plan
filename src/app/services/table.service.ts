import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TableValuesArrayDto } from '../components/table-container/components/dto/table-values-array.dto';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  tableValuesArrayTop: TableValuesArrayDto[]
  tableValuesArrayBottom: TableValuesArrayDto[]

  tableValuesArray: TableValuesArrayDto[] = [
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

  prepareArraysToEditMode(editedRow: number){
    this.tableValuesArrayTop = this.tableValuesArray.slice(0, editedRow - 1);
    this.tableValuesArrayBottom = this.tableValuesArray.slice(editedRow);
  }

  onDeleteItem(itemRow: HTMLElement){
    const productName = itemRow.childNodes[0].firstChild.nodeValue;
    this.tableValuesArray = this.tableValuesArray.filter(row => row.product !== productName);

    return this.tableValuesArray
  }
}
