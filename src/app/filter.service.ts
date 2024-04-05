import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSubject = new BehaviorSubject<string>('');

  filter = this.filterSubject.asObservable().pipe(debounceTime(500));

  updateFilter(searchQuery: string) {
    this.filterSubject.next(searchQuery);
  }
}
