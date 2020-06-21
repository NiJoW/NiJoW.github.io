export class Bonusprogramm {
    id_bonusprogramm: number;
    titel: string;
    nachricht: string;
    frist: Date;
    punkte_in_kategorie: number;
    aeltesterID: number;
    aeltersterName: string;
    kategorieID: number;
    kategorieName: string;
    bezeichnung: string;

    constructor(titel: string, nachricht: string, punkte_in_kategorie: number,
        aeltesterID: number, kategorieID: number) {
    this.titel = titel;
    this.punkte_in_kategorie = punkte_in_kategorie;
    this.nachricht = nachricht;
    this.aeltesterID = aeltesterID;
    this.kategorieID = kategorieID;
}
}