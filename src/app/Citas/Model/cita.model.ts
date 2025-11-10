export interface Cita {
  idCita: string;
  idMascota: string;
  fechaCita: string;
  horaCita: string;
  motivo: string;
  veterinarioAsignado: string;
  estadoCita: string;
  observaciones?: string;
  fechaRegistro: string;
}

