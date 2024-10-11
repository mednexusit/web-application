import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  isOpenModal: boolean = false; // To control modal visibility
  @Input() itemList: any[] = []; // List of items to search from
  @Input() displayField: string = 'name'; // Field to display in the input
  @Input() formGroup!: FormGroup; // FormGroup passed from parent
  @Input() controlName!: string; // FormControl name
  @Input() placeholder!: string;
  @Output() selectedValue = new EventEmitter<any>(); // Emit selected value

  filteredList: any[] = [];
  searchedText: string = '';
  selectedName: string = ''; // This will be used to show the name in the input

  constructor(private fb: FormBuilder, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.filteredList = [...this.itemList]; // Initialize with full list

    // Watch for form control value changes
    this.formGroup
      .get(this.controlName)
      ?.valueChanges.subscribe((data: any) => {
        if (typeof data === 'string') {
          this.searchedText = data;
          if (data.length) {
            this.filterItem(data);
            this.isOpenModal = true; // Open the modal when typing starts
          } else {
            this.isOpenModal = false; // Close modal when input is cleared
            this.filteredList = [...this.itemList]; // Reset list
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
    this.isOpenModal = false; // Close modal when item is selected
    this.selectedName = selectedItem[this.displayField]; // Display the name in the input
    this.formGroup.get(this.controlName)?.setValue(selectedItem.id); // Set the id as form control value
    this.selectedValue.emit(selectedItem); // Emit the entire selected object
  }

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.formGroup.get(this.controlName)?.setValue(inputValue); // Temporarily set the input value to the control for filtering
  }

  onFocus() {
    this.isOpenModal = true; // Open modal when input is focused
  }

  // Close the modal when clicking outside the component
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpenModal = false; // Close modal when clicked outside
    }
  }
}
