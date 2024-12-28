import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../../../service/destination.service';
import { Destination } from '../../../model/destination';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-new-destination',
  templateUrl: './new-destination.component.html',
  styleUrls: ['./new-destination.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class NewDestinationComponent implements OnInit {
  destination: Destination | undefined;

  constructor(private route: ActivatedRoute, private destinationService: DestinationService) {}

  ngOnInit(): void {
    const dest_code = this.route.snapshot.paramMap.get('id');
    if (dest_code) {
      this.destinationService.get(dest_code).subscribe((destination) => {
        this.destination = destination;
      });
    }
  }
}