import { DienstStatus } from './DienstStatus.enum';

export class Dienst {
    id_dienstangebot: number;
    name: string;
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
    tugendhafterName: string;
    suchenderName: string;
    kategorieTitel: string;

    constructor(name: string, beschreibung: string,
        tugendhafterID: number, kategorieID: number) {
this.name = name;
this.beschreibung = beschreibung;
this.tugendhafterID = tugendhafterID;
this.kategorieID = kategorieID;
}
}