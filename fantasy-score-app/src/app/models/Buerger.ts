import { BuergerTyp } from './BuergerTyp.enum';

export class Buerger {
    id_buerger: number;
    tugendhafterID: number;
    benutzername: string;
    passwort: string;
    email_adresse: string;
    typ: BuergerTyp;
    social_score: number;
    status: string;

    constructor(name: string, passwort: string, email: string, typ: BuergerTyp) {
        this.benutzername = name;
        this.passwort = passwort;
        this.email_adresse = email;
        this.typ = typ;
    }
}