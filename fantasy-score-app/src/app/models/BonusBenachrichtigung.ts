export class BonusBenachrichtigung {
  // bezieht sich auf Tbl profitiert_von_bonusprogramm
  // dem Nutzer wird angezeigt, ob/für welches für ein Bonusprogramm er in Frage kommt und davon profitiert
  // kann Nachricht als gelesen markieren

  id_profitiert_von_bonusprogramm: number;
  fk_buerger_id: number;
  fk_bonusprogramm_id: number;
  gelesen: boolean;
  id_bonusprogramm: number;
  titel_bonusprogramm: string;
  nachricht: string;
  kategorieName: string;
}
