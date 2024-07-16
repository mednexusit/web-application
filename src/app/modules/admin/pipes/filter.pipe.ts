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
      item.id && item.id.toString().toLowerCase().includes(searchTerm) ||
      item.name && item.name.toLowerCase().includes(searchTerm)||
     item.uuid && item.uuid.toString().toLowerCase().includes(searchTerm) ||
     item.mobile && item.mobile.toString().toLowerCase().includes(searchTerm)||
     item.heading && item.heading.toString().toLowerCase().includes(searchTerm)||
     item.subheading && item.subheading.toString().toLowerCase().includes(searchTerm)
    );
  }

}
