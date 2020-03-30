import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'my-app',
  template: `<div class="chart__wrapper"
         [hidden]="!chart">
      <canvas #canvas>
      </canvas>
    </div>`,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
   chart: any;
    @ViewChild('canvas') canvas: ElementRef;
    ngOnInit() {
      Chart.defaults.global.pointHitDetectionRadius = 1;
      const customTooltips = function(tooltip) {
      // Tooltip Element
      let tooltipEl = document.getElementById('chartjs-tooltip');
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';
        this._chart.canvas.parentNode.appendChild(tooltipEl);
      }
      // Hide if no tooltip
      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0 as any;
        return;
      }
      // Set caret Position
      tooltipEl.classList.remove('above', 'below', 'no-transform');
      if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
      } else {
        tooltipEl.classList.add('no-transform');
      }
      function getBody(bodyItem) {
        return bodyItem.lines;
      }
      // Set Text
      if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(getBody);
        let innerHtml = '<thead>';
        titleLines.forEach(function(title) {
          innerHtml += '<tr><th>' + title + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';
        bodyLines.forEach(function(body, i) {
          const colors = tooltip.labelColors[i];
          let style = 'background:' + colors.backgroundColor;
          style += '; border-color:' + colors.borderColor;
          style += '; border-width: 2px';
          const span = '<span class="chartjs-tooltip-key" style="' +
          style +'"> <img src=""/> </span>';
          innerHtml += '<tr><td>' + span + body + '</td></tr>';
        });
        innerHtml += '</tbody>';
        const tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
      }
      const positionY = this._chart.canvas.offsetTop;
      const positionX = this._chart.canvas.offsetLeft;
      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1 as any;
      tooltipEl.style.left = positionX + tooltip.caretX + 'px';
      tooltipEl.style.top = positionY + tooltip.caretY + 'px';
      tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
      tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
      tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
      tooltipEl.style.padding = tooltip.yPadding +
      'px ' +
      tooltip.xPadding +
      'px';
    };
    // console.log(this.barData);
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
       data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [1, 19, 45, 5, 2, 3]
        },
                  {
            label: '# of Votes',
            data: [2, 7, 54, 65, 2, 3]
        },{
            label: '# of Votes',
            data: [3, 8, 3, 68, 2, 3]
        },{
            label: '# of Votes',
            data: [4, 5, 52, 36, 2, 3]
        }],
      },
      options: {
        maintainAspectRatio: false,
        responsiveAnimationDuration: 0,
        responsive: true,
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
                gridLines: {
                  display: true,
                  color: 'rgba(255,99,132,0.2)',
              },
            },
          ],
          xAxes: [
            {
              stacked: true,
              ticks: {
                // beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
        ],
        },
        legend: {
          display: false,
        },
         tooltips: {
            enabled: false,
            mode: 'index',
            position: 'nearest',
            custom: customTooltips,
          },
      },
    });
  }
}
