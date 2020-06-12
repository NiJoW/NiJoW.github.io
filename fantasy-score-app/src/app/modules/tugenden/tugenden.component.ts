import { Component, OnInit, ViewChild } from '@angular/core';
import { Kategorie } from 'src/app/models/Kategorie';
import { KategorieService } from '../../services/kategorie.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Tugend } from 'src/app/models/Tugend';
import { TugendService } from 'src/app/services/tugend.service';
import { NotificationComponent } from '../notification/notification.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-tugenden',
  templateUrl: './tugenden.component.html',
  styleUrls: ['./tugenden.component.css']
})
export class TugendenComponent implements OnInit {

  searchForm;
  kategorieID: number;
  searchInput: string;
  searchText;

  constructor(private kategorieService: KategorieService, 
    private tugendService: TugendService,
    private messageService: MessageService,
    //private notificationComponent: NotificationComponent,
    private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchInput: ''
    });
  }

  kategorienListe: Observable<Kategorie[]>;
  tugenden: Observable<Tugend[]>;
  shownTugenden: Tugend[];
  choosenTugend: Observable<Tugend>;

  ngOnInit(): void {
    this.kategorienListe = this.kategorieService.getKategorien();

    this.kategorienListe.subscribe(data => {
      console.log(data);
      console.log(this.kategorienListe);
    });
    this.tugenden = this.tugendService.getTugenden();
    this.tugenden.subscribe(data => {
      console.log(data);
      this.shownTugenden = data;
    });
  }

  onKategorieSelected(kategorieID):void {
    if(kategorieID == "-1") { // Alle anzeigen
      this.tugenden = this.tugendService.getTugenden();
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

  onSearch(searchData) {
    console.log(searchData.searchInput);
    //ToDo: Such-Funktion
  }
  

  
planen(tugendId: number) {
  console.log("Nutzer will Tugend mit Id: " + tugendId + " planen.");
  this.choosenTugend = this.tugendService.planeTugend(tugendId);
  this.choosenTugend.subscribe(data => {
    console.log(data);
    this.messageService.setMessage("Die Tugend wurde deinem Dashboard hinzugefügt.");
    //this.notification.showNotification("Die Tugend wurde deinem Dashboard hinzugefügt.");
  });
  
  //openDashboard();
}
}


