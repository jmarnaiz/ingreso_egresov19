// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// App modules
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

// Components
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailsComponent } from './details/details.component';
import { GraphicComponent } from './statistics/graphic/graphic.component';

// Pipes
import { OrderIngresosEgresosPipe } from '../pipes/order-ingresos-egresos.pipe';

// Graphics
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// NgRx
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    StatisticsComponent,
    DetailsComponent,
    OrderIngresosEgresosPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),

    ReactiveFormsModule,
    GraphicComponent, //Standalone component, no es necesario que forme parte de ningún módulo
    SharedModule,
    DashboardRoutesModule,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class IngresoEgresoModule {}
