import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { categoryEvent } from '../../../models/enums/category/categoryEvent';
import { deleteCategoryAction } from '../../../models/interface/categories/events/deleteCategoryAction';
import { getCategoriesResponse } from '../../../models/interface/categories/responses/getCategoriesResponse';
import { ProductsComponent } from '../../products/products.component';
import { editCategoryAction } from './../../../models/interface/categories/events/editCategoryAction';

@Component({
  selector: 'app-categories-table',
  standalone: true,
  imports: [
    CommonModule,
    ProductsComponent,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
  ],
  templateUrl: './categories-table.component.html',
})
export class CategoriesTableComponent {
  @Input() public categories: Array<getCategoriesResponse> = []
  @Output() public categoryEvent = new EventEmitter<editCategoryAction>()
  @Output() public deleteCategoryEvent = new EventEmitter<deleteCategoryAction>()

  public categorySelected!: getCategoriesResponse
  public addCategoryAction = categoryEvent.ADD_CATEGORY_ACTION
  public editCategoryAction = categoryEvent.EDIT_CATEGORY_ACTION

  handleCategoryEvent(
    action: string,
    id?: string,
    categoryName?: string
  ): void {
    if (action && action !== '') {
      this.categoryEvent.emit({ action, id, categoryName })
    }
  }

  handleDeleteCategoryEvent(category_id: string, categoryName: string): void {
    if (category_id !== '' && categoryName !== '') {
      this.deleteCategoryEvent.emit({ category_id, categoryName })
    }
  }
}
