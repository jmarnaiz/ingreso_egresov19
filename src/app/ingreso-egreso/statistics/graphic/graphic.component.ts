import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'ie-graphic',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graphic.component.html',
  styles: ``,
})
export class GraphicComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  @Input() ingresos: number;
  @Input() egresos: number;
  private _currentIngresos: number;
  private _currentEgresos: number;
  // Doughnut
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [],
  };

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    maintainAspectRatio: false,
  };

  constructor() {
    this.ingresos =
      this.egresos =
      this._currentIngresos =
      this._currentEgresos =
        0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    (this._currentIngresos =
      changes['ingresos']?.currentValue ?? this._currentIngresos),
      (this._currentEgresos =
        changes['egresos']?.currentValue ?? this._currentEgresos);
    this.doughnutChartData.datasets = [
      {
        data: [this._currentIngresos, this._currentEgresos],
      },
    ];
    // Update chat
    this.chart?.chart?.update();
  }
}
