import { Component, computed, signal } from '@angular/core';
import { PhotoComponent } from "./photo/photo.component";

const WEDDING_DAY = new Date(2025, 10, 1, 0, 0, 0, 0);

interface Time {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

@Component({
  selector: 'app-home',
  imports: [PhotoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

    public now = signal(new Date()); 
    public timeTillWedding = computed<Time>(() => {
        const nowTime = this.now().getTime();
        const weddingTime = WEDDING_DAY.getTime();

        const difference = weddingTime - nowTime;

        let days = difference / 1000 / 60 / 60 / 24;
        let remainder = days % Math.floor(days);
        days = Math.floor(days);

        let hours = remainder * 24;
        remainder = hours % Math.floor(hours);
        hours = Math.floor(hours);

        let minutes = remainder * 60;
        remainder = minutes % Math.floor(minutes);
        minutes = Math.floor(minutes);

        let seconds = remainder * 60;
        seconds = Math.floor(seconds);

        return {
            days,
            hours,
            minutes,
            seconds
        } 
    });

    constructor() {
        setInterval(() => this.now.update(() => new Date()), 1000);
    }
}
