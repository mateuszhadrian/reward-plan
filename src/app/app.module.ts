import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { StandardViewTableComponent } from './components/table-container/components/standard-view-table/standard-view-table.component';
import { EditViewTableComponent } from './components/table-container/components/edit-view-table/edit-view-table.component';
import { TableContainerComponent } from './components/table-container/table-container.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from  '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StandardViewTableComponent,
    EditViewTableComponent,
    TableContainerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
