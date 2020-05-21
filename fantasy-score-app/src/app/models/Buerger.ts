import { BuergerTyp } from './BuergerTyp.enum';

export class Buerger {
    id_buerger: number;
    benutzername: string;
    passwort: string;
    email_adresse: string;
    typ: BuergerTyp;
}