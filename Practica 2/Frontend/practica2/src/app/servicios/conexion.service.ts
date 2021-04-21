import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  
  constructor(private http:HttpClient) { }

  VolumenMax(id:string){
    let url1 = 'https://us-central1-practica2-e68c2.cloudfunctions.net/app/volmax/'+id;
    return this.http.get(url1);
  }
  VolumenMin(id:string){
    let url1 = 'https://us-central1-practica2-e68c2.cloudfunctions.net/app/volmin/'+id;
    return this.http.get(url1);
  }
  Volumenes(id:string){
    let url1 = 'https://us-central1-practica2-e68c2.cloudfunctions.net/app/volprom/'+id;
    return this.http.get(url1);
  }
  VolumenHora(Horas:string,id:String){
    let url1 = 'https://us-central1-practica2-e68c2.cloudfunctions.net/app/volhora/'+id+'/'+Horas;
    return this.http.get(url1);
  }
  VolumenHoras(id:string){
    let url1 = 'https://us-central1-practica2-e68c2.cloudfunctions.net/app/volhora/'+id;
    return this.http.get(url1);
  }
  ObtenerID(){
    let url1 = 'https://us-central1-practica2-e68c2.cloudfunctions.net/app/ObtenerId';
    return this.http.get(url1);
  }

  Crear():Observable<any>{
 
    let url1 = 'https://us-central1-practica2-e68c2.cloudfunctions.net/app/CrearSesion';
    return this.http.post(url1,'');
  }



  
}
