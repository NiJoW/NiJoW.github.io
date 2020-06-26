import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {Taetigkeit} from "../../../../models/Taetigkeit";
import {TaetigkeitService} from "../../../../services/taetigkeit.service";
import {MessageService} from "../../../../services/message.service";
import {DoUpdateService} from "../../../../services/do-update.service";

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
              private data: DoUpdateService
  ) { }

  Taetigkeiten: Observable<Taetigkeit[]>;

  ArrDo = Array; //Array type captured in a variable
  ArrDone = Array;

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

  checkmarkTaetigkeitErfuellt(e, id_taetigkeit, bisherigeWdh){
    // Erhöhte Anzahl an erfüllten Wiederholungen in DB speichern
    let erhoehteWdh = bisherigeWdh + 1;
    this.taetigkeitService.increaseErfuellteWdhTaetigkeit(id_taetigkeit, erhoehteWdh)
      .subscribe(data => { //console.log(data);
                               } );

    // Erfolgmitteilung + Update des Views
    this.updateViews();
  }

  updateViews() {
    this.messageService.setMessage("Juhu, du hast eine tugendhafte Aufgabe erfüllt!", true);
    this.getTaetigkeitenForActiveUser();
    this.data.doViewUpdate(true);
  }

}
