import { Component } from '@angular/core';
import { SearchFlightComponent } from "../../flights/pages/search-flight/search-flight.component";
import { LastMinFlightComponent } from "../../flights/pages/last-min-flight/last-min-flight/last-min-flight.component";
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home-page',
  imports: [SearchFlightComponent, LastMinFlightComponent, MatExpansionModule, MatFormFieldModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
}
