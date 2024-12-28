import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FlightsService } from '../../service/flights.service';
import { Flights } from '../../model/flights';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-flight',
  templateUrl: './find-flight.component.html',
  styleUrls: ['./find-flight.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class FindFlightComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Flights>;
  displayedColumns: string[] = ['id', 'from', 'to', 'departure', 'return', 'book'];
  flights: Flights[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private flightsService: FlightsService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.flights);
  }

  ngOnInit(): void {
    this.loadFlights();

    // Custom filter logic for all fields
    this.dataSource.filterPredicate = (data: Flights, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      return (
        data.id.toString().toLowerCase().includes(searchTerm) ||
        data.originCode.toLowerCase().includes(searchTerm) ||
        data.destinationCode.toLowerCase().includes(searchTerm) ||
        data.departureDateTime.toISOString().toLowerCase().includes(searchTerm) ||
        data.returnDateTime.toISOString().toLowerCase().includes(searchTerm)
      );
    };

    // Custom sorting logic
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'from':
          return item.originCode;
        case 'to':
          return item.destinationCode;
        case 'departure':
          return new Date(item.departureDateTime).getTime();
        case 'return':
          return new Date(item.returnDateTime).getTime();
        default:
          return item[property as keyof Flights] as string | number;
      }
    };
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadFlights(): void {
    this.flightsService.list().subscribe((data: Flights[]) => {
      this.flights = data;
      this.dataSource.data = this.flights; // Update dataSource with new data
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
