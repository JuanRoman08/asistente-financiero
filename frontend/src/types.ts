// frontend/src/types.ts
export interface Transaction {
  id: number;
  fecha: string;
  descripcion: string;
  monto: string;
  tipo: 'Ingreso' | 'Gasto';
}