import { BannerComponent } from './../../../banner/banner.component';
import { BuergerService } from 'src/app/services/data/buerger.service';
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/utility/auth.service';
import {Taetigkeit} from "../../../../models/Taetigkeit";
import {TaetigkeitService} from "../../../../services/data/taetigkeit.service";
import {MessageService} from "../../../../services/utility/message.service";
import {DoUpdateService} from "../../../../services/utility/do-update.service";

@Component({
  selector: 'app-todo-tugenden-taetigkeiten',
  templateUrl: './todo-tugenden-taetigkeiten.component.html',
  styleUrls: ['./todo-tugenden-taetigkeiten.component.css']
})
export class TodoTugendenTaetigkeitenComponent implements OnInit {

  editIcon = faPencilAlt;
  createIcon = faPlus;

  constructor( //private tugendService: TugendService,
              private taetigkeitService: TaetigkeitService,
              private messageService: MessageService,
              private authService: AuthService,
              private data: DoUpdateService,
              private buergerService: BuergerService,
              private doUpdateService: DoUpdateService
  ) { }

  Taetigkeiten: Observable<Taetigkeit[]>;

  ArrDo = Array; //Array type captured in a variable
  ArrDone = Array;
  message: string;

  ngOnInit(): void {
    this.getTaetigkeitenForActiveUser();
    this.data.currentDoUpdateState.subscribe(message => this.getTaetigkeitenForActiveUser());
  }

  getTaetigkeitenForActiveUser(){
    this.Taetigkeiten = this.taetigkeitService.getTaetigkeitByUserID();

    this.Taetigkeiten.subscribe(data => {
      //   console.log(data);
    });
   // console.log(this.Taetigkeiten);
  }

  checkmarkTaetigkeitErfuellt(e, id_taetigkeit, bisherigeWdh, benoetigteWdh, wert){
    // Erhöhte Anzahl an erfüllten Wiederholungen in DB speichern
    let erhoehteWdh = bisherigeWdh + 1;
    this.taetigkeitService.increaseErfuellteWdhTaetigkeit(id_taetigkeit, erhoehteWdh)
      .subscribe(data => { //console.log(data);
      });
       
if(erhoehteWdh === benoetigteWdh) {
  this.buergerService.erhoeheSocialScore(this.authService.getNutzer().id_buerger ,wert)
    .subscribe(data => {
      this.message = "Juhu, du hast eine tugendhafte Aufgabe beendet!"
      // Erfolgmitteilung + Update des Views
      this.updateViews(this.message);
    });
} else {
  this.message = "Fleißig! Du hast eine tugendhafte Aufgabe angekreuzt!"
     // Erfolgmitteilung + Update des Views
     this.updateViews(this.message);
  }
}

  updateViews(message: string) {
    this.messageService.setMessage(message, true);
    this.getTaetigkeitenForActiveUser();
    this.data.doViewUpdate_SocialScore(true);
  }

}
