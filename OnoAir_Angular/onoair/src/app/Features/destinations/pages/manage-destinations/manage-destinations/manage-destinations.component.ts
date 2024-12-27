import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DestinationService } from '../../../service/destination.service';
import { Destination } from '../../../model/destination';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-destinations',
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ManageDestinationsComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Destination>;
  displayedColumns: string[] = ['dest_name', 'dest_code', 'airport_name', 'airport_url', 'airport_email', 'image_url', 'action'];
  destinations: Destination[] = [];

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private destinationService: DestinationService) {
    this.dataSource = new MatTableDataSource(this.destinations);
  }

  ngOnInit(): void {
    this.loadDestinations();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort ?? null;
    this.dataSource.paginator = this.paginator ?? null;
  }

  loadDestinations(): void {
    this.destinationService.list().subscribe((data: Destination[]) => {
      this.destinations = data;
      this.dataSource.data = this.destinations;
    });
  }

  onEdit(destination: Destination): void {
    // Implement the edit functionality here
    console.log('Edit destination:', destination);
  }
}