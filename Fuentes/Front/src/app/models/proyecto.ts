export interface proyecto {
    ID_PROYECTO: number;
    NOMBRE_PROYECTO: string;
    ETAPA: number;
    USUARIO_ID_USUARIO: number;
    CONVOCATORIA_ID_CONVOCATORIA : number;
    CORRECCIONES: Boolean;
    CORREGIDO: Boolean;
    FECHA: Date; 
}