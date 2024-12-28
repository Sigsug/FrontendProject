import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FlightsService } from '../../../service/flights.service';
import { Flights } from '../../../model/flights';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class ManageFlightsComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Flights>;
  displayedColumns: string[] = ['id', 'originCode', 'destinationCode', 'departureDateTime', 'returnDateTime', 'numberOfSeats', 'action'];
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

  viewFlight(flightId: number): void {
    this.router.navigate(['/flight-info', flightId]);
  }

  // editFlight(flightId: number): void {
  //   // Implement the edit functionality here
  //   console.log('Edit flight:', flightId);
  // }
}