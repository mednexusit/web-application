import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Input() itemList: any[] = []; // List of items to search from
  @Input() displayField: string = 'name'; // Field to display in the input
  @Input() formGroup!: FormGroup; // FormGroup passed from parent
  @Input() controlName!: string; // FormControl name
  @Input() placeholder!: string;
  @Output() selectedValue = new EventEmitter<any>(); // Emit selected value

  filteredList: any[] = [];
  isSearchStart: boolean = false;
  searchedText: string = '';
  selectedName: string = ''; // This will be used to show the name in the input

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filteredList = [...this.itemList]; // Initialize with full list

    this.formGroup
      .get(this.controlName)
      ?.valueChanges.subscribe((data: any) => {
        // Only set when user types, not when user selects
        if (typeof data === 'string') {
          this.searchedText = data;
          if (data.length) {
            this.filterItem(data);
            this.isSearchStart = true;
          } else {
            this.isSearchStart = false;
            this.filteredList = [...this.itemList]; // Reset list if input is cleared
          }
        }
      });
  }

  filterItem(text: string) {
    this.filteredList = this.itemList.filter((item: any) =>
      item[this.displayField].toLowerCase().includes(text.toLowerCase())
    );
  }

  selectItem(selectedItem: any) {
    this.selectedName = selectedItem[this.displayField]; // Display the name in the input field
    this.formGroup.get(this.controlName)?.setValue(selectedItem.id); // Set the id as form control value
    this.isSearchStart = false;
    this.selectedValue.emit(selectedItem); // Emit the entire selected object
  }

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.formGroup.get(this.controlName)?.setValue(inputValue); // Temporarily set the input value to the control for filtering
  }

  onFocus() {
    if (this.formGroup.get(this.controlName)?.value.length) {
      this.isSearchStart = true;
    }
  }
}
