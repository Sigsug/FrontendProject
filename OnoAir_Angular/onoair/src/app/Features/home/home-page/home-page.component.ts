import { Component } from '@angular/core';
import { LastMinFlightComponent } from "../../flights/pages/last-min-flight/last-min-flight/last-min-flight.component";
import { FindFlightComponent } from "../../flights/pages/find-flight/find-flight.component";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [LastMinFlightComponent, FindFlightComponent, MatTabsModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
}
