import {AfterViewInit, Component, NgModule, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Flights } from '../../model/flights';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css'],
  imports: [MatTableModule, MatPaginatorModule],
  providers: [DatePipe]
})
export class SearchFlightComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Flights>;
  displayedColumns: string[] = ['id', 'from', 'to', 'departure', 'return'];

  flights = [
    new Flights(123, "London", "New York", new Date(), new Date(), 2),
    new Flights(222, "Tel-Aviv", "Amsterdam", new Date(), new Date(), 3),
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(this.flights);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}