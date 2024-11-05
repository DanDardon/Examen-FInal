export type Priority = 'baja' | 'media' | 'alta';

export interface Project {
  id: string;
  titulo: string;
  descripcion?: string;
  completada: boolean;
  fecha_creacion: string;
  fecha_vencimiento?: string;
  prioridad: Priority;
  asignado_a?: string;
  categoria?: string;
  costo_proyecto: number;
  pagado: boolean;
}