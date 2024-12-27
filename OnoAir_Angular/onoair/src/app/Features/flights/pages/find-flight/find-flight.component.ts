import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
    RouterModule
  ]
})
export class FindFlightComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Flights>;
  displayedColumns: string[] = ['id', 'from', 'to', 'departure', 'return', 'book'];
  flights: Flights[] = [];

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private flightsService: FlightsService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.flights);
  }
  ngOnInit(): void {
    this.loadFlights();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort ?? null;
    this.dataSource.paginator = this.paginator ?? null;
  }

  loadFlights(): void {
    this.flightsService.list().subscribe((data: Flights[]) => {
      this.flights = data;
      this.dataSource.data = this.flights;
    });
  }

  // bookFlight(flightId: number): void {
  //   this.router.navigate(['/book-flight', flightId]);
  // }

}