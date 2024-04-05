import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterSubject = new BehaviorSubject<string>('');
  public clearSearchSubject: boolean = false;

  filter = this.filterSubject.asObservable().pipe(debounceTime(700));

  updateFilter(searchQuery: string) {
    this.filterSubject.next(searchQuery);
  }
}
