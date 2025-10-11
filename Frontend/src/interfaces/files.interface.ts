export interface Files {
  id: number;
  nombre_fact: string;
  url: string;
  nombre: string;
  type: string;
}

export interface FilesResponse {
  archivos: Files[];
}
