import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modalautocomplete',
  templateUrl: './modalautocomplete.component.html',
  styleUrl: './modalautocomplete.component.scss',
})
export class ModalautocompleteComponent implements OnInit, OnChanges {
  @Input() items: any[] = [];
  @Input() searchItem: any;
  @Input() isOpen: boolean = false;
  @Input() placeholder: any = '';
  @Output() itemSelected = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Input() fieldName: any;
  filteredList: any = [];
  @ViewChild('inputElement') inputRef!: ElementRef;
  searchText: any;
  selectedItemText: any = '';
  constructor(private elRef: ElementRef) {}
  ngOnInit(): void {
    this.filteredList = [...this.items];
  }
  openList() {
    this.filteredList = [...this.items];
  }
  getSearchText(event: any) {
    this.searchText = event.target.value;
    if (this.searchText.length) {
      this.filterItem(this.searchText);
    } else {
      this.filteredList = [...this.items];
    }
  }
  filterItem(text: string) {
    this.filteredList = this.items.filter((item: any) =>
      item[this.fieldName].toLowerCase().includes(text.toLowerCase())
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['items']?.currentValue) {
      this.filteredList = [...this.items]; // Update filtered list when items change
    }
  }
  selectItem(data: any) {
    this.selectedItemText = data[this.fieldName];
    this.itemSelected.emit(data);
    this.closeModal.emit();
    this.filteredList = [];
  }
  closeModalOpen() {
    this.closeModal.emit();
    this.filteredList = [];
  }
  clearText() {
    this.searchText = '';
    this.selectedItemText = '';
    this.inputRef.nativeElement.focus();
  }
}
