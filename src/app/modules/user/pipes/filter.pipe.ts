import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item =>
      item.organizedby && item.organizedby.toString().toLowerCase().includes(searchTerm) ||
      item.venu && item.venu.toLowerCase().includes(searchTerm)
    );
  }
}
