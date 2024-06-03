import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent {
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {}
  @Input() placeHolder: any;
  @Input() suggestions: any = [];
  @Output() selectEvent = new EventEmitter<any>();

  query: any = '';
  filteredList: any = ([] = this.suggestions);

  filter() {
    if (this.query !== '') {
      this.filteredList = this.suggestions.filter((item: any) =>
        item.name.toLowerCase().includes(this.query.toLowerCase())
      );
    } else {
      this.filteredList = [];
    }
  }

  select(item: any) {
    this.query = item.name;
    this.filteredList = [];
    this.selectEvent.emit(item);
  }
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.filteredList = [];
    }
  }

}
