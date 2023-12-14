import { Component } from '@angular/core';

@Component({
  selector: 'app-chart-ano',
  templateUrl: './chart-ano.component.html',
  styleUrls: ['./chart-ano.component.css']
})
export class ChartAnoComponent {
    dataChart = {
        labels: [2023, 2022, 2021, 2019, 2018, 2017, 2016],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1,
            tension: 0.1
        }]
    };

    options = {
        indexAxis: 'y',
    }
}
