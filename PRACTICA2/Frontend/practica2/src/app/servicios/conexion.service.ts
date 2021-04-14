import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  constructor(private http:HttpClient) { }

  VolumenMax(){
    let url1 = 'http://localhost:5000/practica2-8875c/us-central1/app/volmax';
    return this.http.get(url1);
  }
  VolumenMin(){
    let url1 = 'http://localhost:5000/practica2-8875c/us-central1/app/volmin';
    return this.http.get(url1);
  }
  Volumenes(){
    let url1 = 'http://localhost:5000/practica2-8875c/us-central1/app/volprom';
    return this.http.get(url1);
  }
  VolumenHora(Horas:string){
    let url1 = 'http://localhost:5000/practica2-8875c/us-central1/app/volhora/'+Horas;
    return this.http.get(url1);
  }
}
