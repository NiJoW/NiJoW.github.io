import { BuergerTyp } from './BuergerTyp.enum';

export class Buerger {
    id_buerger: number;
    benutzername: string;
    passwort: string;
    email_adresse: string;
    typ: BuergerTyp;

    constructor(name: string, passwort: string, email: string, typ: BuergerTyp) {
        this.benutzername = name;
        this.passwort = passwort;
        this.email_adresse = email;
        this.typ = typ;
    }
}