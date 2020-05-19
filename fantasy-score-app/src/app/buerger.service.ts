import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BuergerService {
    constructor(private http: HttpClient) {}

    private buergerUrl = 'api/buerger';

    getBuerger(): Observable<{}> {
        return this.http.get(this.buergerUrl)
    }

   
    // Make the HTTP request:
  //  this.http.get('http://localhost:port/assets/data.json')
    //         .subscribe(data => console.log(data));
}