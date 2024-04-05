import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  constructor(private router: Router, private filterService: FilterService) {}
  ngOnInit(): void {
    console.log('searchQuery', this.searchQuery);
  }

  searchQuerys(event: any) {
    let value = event.target.value;
    // console.log('value', value);
    if (value) {
      this.router.navigate(['/user-list'], {
        queryParams: { searchQuery: event.target.value },
      });
    } else {
      this.router.navigateByUrl('/user-list');
    }
  }

  searchFilter() {
    this.filterService.updateFilter(this.searchQuery);
  }

  clearSearch() {
    this.searchQuery = '';
    this.router.navigate(['/user-list'], {
      queryParams: { searchQuery: null },
    });
  }
}
