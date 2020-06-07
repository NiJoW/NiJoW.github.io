export class Tugend{
    id_tugend: number;
    name: string;
    beschreibung: string;
    wert: number;
    icon: string;
    benoetigteWdh: number;
    aeltesterID: number;
    erfuellteWdh: number;
    kategorieTitel: string;
    kategorieID: number;

  constructor(name: string, beschreibung: string, wert: number, benoetigteWdh: number,
              aeltesterID: number, kategorieID: number) {
    this.name = name;
    this.beschreibung = beschreibung;
    this.wert = wert;
    this.benoetigteWdh = benoetigteWdh;
    this.aeltesterID = aeltesterID;
    this.kategorieID = kategorieID;
  }
}
