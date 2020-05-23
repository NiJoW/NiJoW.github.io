import { DienstStatus } from './DienstStatus.enum';

export class Dienst {
    id_dienstangebot: number;
    beschreibung: string;
    bild: string;
    tugendhafterID: number;
    kategorieID: number;
    id_dienstvertrag: number;
    dienstID: number;
    suchenderID: number;
    datum: Date;
    status: DienstStatus;
    suchenderGelesen: boolean;
}