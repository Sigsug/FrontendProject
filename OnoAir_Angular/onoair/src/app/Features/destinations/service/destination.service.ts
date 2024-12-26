import { Injectable } from '@angular/core';
import { Destination } from '../model/destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor() { }
  private Destination = [
    new Destination("CDG","Paris", "Paris Charles de Gaulle", "https://www.parisaeroport.fr/", "https://media.gettyimages.com/id/1185953092/photo/the-main-attraction-of-paris-and-all-of-europe-is-the-eiffel-tower-in-the-rays-of-the-setting.jpg?b=1&s=170667a&w=0&k=20&c=RQMkDSuO8X0Wm_j6WgvcgR3mTucjAiFFgz0XmeUuYjg=")
  ];
}
