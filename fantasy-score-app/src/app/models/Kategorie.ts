export class Kategorie {
    id_kategorie: number;
    bezeichnung: string;
    aeltesterID: number;

    constructor(bezeichnung: string, aeltesterID: number) {
            this.bezeichnung = bezeichnung;
            this.aeltesterID = aeltesterID;

}
}
