import { Buerger } from 'src/app/models/Buerger';
import { AuthService } from 'src/app/services/utility/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Kategorie } from 'src/app/models/Kategorie';
import { KategorieService } from '../../services/data/kategorie.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Tugend } from 'src/app/models/Tugend';
import { TugendService } from 'src/app/services/data/tugend.service';
import { NotificationComponent } from '../notification/notification.component';
import { MessageService } from 'src/app/services/utility/message.service';
import { TaetigkeitService } from 'src/app/services/data/taetigkeit.service';
import { Taetigkeit } from 'src/app/models/Taetigkeit';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tugenden',
  templateUrl: './tugenden.component.html',
  styleUrls: ['./tugenden.component.css']
})
export class TugendenComponent implements OnInit {

  searchForm;
  searchIcon = faSearch;
  kategorieID = -1;
  searchInput: string;
  searchText;
  taetigkeitPruefen: Observable<Taetigkeit[]>;
  nutzer: Buerger;

  constructor(private kategorieService: KategorieService, 
    private tugendService: TugendService,
    private messageService: MessageService,
    //private notificationComponent: NotificationComponent,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private taetigkeitService: TaetigkeitService) {
    this.searchForm = this.formBuilder.group({
      searchInput: ''
    });
  }

  kategorienListe: Observable<Kategorie[]>;
  tugenden: Observable<Tugend[]>;
  shownTugenden: Tugend[];
  chosenTugend: Observable<Tugend>;

  ngOnInit(): void {
    this.kategorienListe = this.kategorieService.getKategorien();

    this.kategorienListe.subscribe(data => {
      console.log(data);
      console.log(this.kategorienListe);
    });
    this.tugenden = this.tugendService.getNichtArchivierteTugenden();
    this.tugenden.subscribe(data => {
      console.log(data);
      this.shownTugenden = data;
    });
  }

  get isLoggedIn() {
    const isLoggedIn = this.authService.isLoggedIn();
    if(isLoggedIn){ this.nutzer = this.authService.getNutzer(); }
    return isLoggedIn;
  }

  isTyp(typ: string) : boolean {
    return this.authService.getNutzer().typ+"" == typ;
  }

  onKategorieSelected(kategorieID):void {
    if(kategorieID == "-1") { // Alle anzeigen
      this.tugenden = this.tugendService.getNichtArchivierteTugenden();
      this.tugenden.subscribe(data => {
        console.log(data);
        this.shownTugenden = data;
      });
      return;
    }

    this.tugenden = this.tugendService.getTugendVonKategorie(kategorieID)
    this.tugenden.subscribe(data => {
      this.shownTugenden = data;
      console.log(this.shownTugenden[0].name);
    });
  }

  suchen(searchData) {
    console.log(searchData.searchInput);
    this.tugenden = this.tugendService.getTugendenLike(searchData.searchInput);
    this.tugenden.subscribe(data => {
      this.shownTugenden = data;
      console.dir(this.shownTugenden[0]);
    });
  }
  

  
  planen(tugendId: number) {
    console.log("Nutzer will Tugend mit Id: " + tugendId + " planen.");
    this.taetigkeitPruefen = this.taetigkeitService.getTaetigkeitByTugendIdVonNutzer(tugendId);
    this.taetigkeitPruefen.subscribe(data => {
      console.log(data);
      if(data.length === 0) {
        this.chosenTugend = this.tugendService.planeTugend(tugendId);
        this.chosenTugend.subscribe(data => {
          console.log(data);
          this.messageService.setMessage("Die Tugend wurde deinem Dashboard hinzugefügt.", true);
        });
      } else {
        this.messageService.setMessage("Die Tugend ist bereits in deinem Dashboard.", false);
      }
    });    
  }
}


