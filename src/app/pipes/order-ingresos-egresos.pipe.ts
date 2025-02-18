import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoDTO } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'orderIngresosEgresos',
  standalone: false,
})
export class OrderIngresosEgresosPipe implements PipeTransform {
  transform(items: IngresoEgresoDTO[]): IngresoEgresoDTO[] {
    return items
      .slice()
      .sort((a) => {
        return a.type;
      })
      .reverse();
  }
}
