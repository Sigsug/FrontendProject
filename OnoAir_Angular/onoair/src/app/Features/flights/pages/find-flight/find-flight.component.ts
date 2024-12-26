// import { Component, OnInit } from '@angular/core';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { FlightsService } from '../../service/flights.service';
// import { Flights } from '../../model/flights';
// import { RouterModule } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// @Component({
//   selector: 'app-find-flight',
//   imports: [
//       FormsModule,
//       MatFormFieldModule,
//       MatInputModule,
//       MatSelectModule,
//       MatButtonModule,
//       MatDatepickerModule,
//       RouterModule,
//       MatNativeDateModule
//   ],
//   templateUrl: './find-flight.component.html',
//   styleUrl: './find-flight.component.css'
// })
// export class FindFlightComponent implements OnInit {
// flightDetails: any;
// onSearch() {
// throw new Error('Method not implemented.');
// }
//   flight: Flights[] = [];
//   constructor(private flightsService: FlightsService) { }
//   ngOnInit(): void {
//     this.flight = this.flightsService.list();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlightsService } from '../../service/flights.service';
import { Flights } from '../../model/flights';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-flight',
  templateUrl: './find-flight.component.html',
  styleUrls: ['./find-flight.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ]
})
export class FindFlightComponent implements OnInit {
  flights: Flights[] = [];
  searchForm: FormGroup = new FormGroup({});
  airports = [
    { code: 'JFK', name: 'New York JFK' },
    { code: 'LAX', name: 'Los Angeles' },
    { code: 'LHR', name: 'London Heathrow' }
  ];

  constructor(private flightsService: FlightsService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      departure: ['', Validators.required],
      return: [''],
      passengers: [1, [Validators.required, Validators.min(1)]]
    });
  }
  ngOnInit(): void {
    this.flightsService.getFlights().subscribe((data: Flights[]) => {
      this.flights = data;
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      const searchCriteria = this.searchForm.value;
      // Implement the search logic here
      console.log('Searching for flights with criteria:', searchCriteria);
      // You can call a service method to search for flights based on the criteria
    }
  }

  searchLastMinute() {
    // Implement last minute search
  }
}
