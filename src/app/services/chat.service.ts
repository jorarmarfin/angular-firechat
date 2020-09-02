import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Mensaje } from '../interface/mensaje.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats:Mensaje[]=[];
  public usuario: any ={}

  constructor(private afs: AngularFirestore,public afa: AngularFireAuth) {
    this.afa.authState.subscribe(user=>{
      if (!user) {
        return;  
      }        
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      console.log('estado del usuario: ',user);
      console.log('mi usuario',this.usuario);
    });


   }
  login(proveedor:string) {
    this.afa.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afa.auth.signOut();
  }
  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('Chats');

    return this.itemsCollection.valueChanges();

    
  }
  agregarMensaje(texto:string){
    let mensaje: Mensaje={
      nombre:'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    }
    this.itemsCollection.add(mensaje);
  }




}
