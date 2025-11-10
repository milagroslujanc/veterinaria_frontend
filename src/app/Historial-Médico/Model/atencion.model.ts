export interface Atencion {
  idAtencion: string;
  idCita: string;
  idMascota: string;
  fechaAtencionReal: string;
  veterinario: string;
  diagnostico: string;
  procedimiento: string;
  receta: string;
  estadoFinal: string;
  proximoControl?: string;
  tratamiento?: string;
  vacunasAplicadas?: string;
  pesoActual?: number;
  observaciones?: string;
}

