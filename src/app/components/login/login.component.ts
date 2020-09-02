import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private chatservice:ChatService) { }
  
  ngOnInit(): void {
  }
  ingresar(proveedor:string){
    console.log(proveedor);
    this.chatservice.login(proveedor);
    
  }

}
