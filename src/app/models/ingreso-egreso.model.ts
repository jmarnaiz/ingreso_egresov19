export interface IngresoEgresoDTO {
  description: string;
  amount: string;
  type: IngresoEgresoType;
  uid?: string;
}

export enum IngresoEgresoType {
  'INGRESO',
  'EGRESO',
}
