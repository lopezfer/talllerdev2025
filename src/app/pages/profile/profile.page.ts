import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  constructor(
    public auth: AuthService,
    public db: DatabaseService
  ) { }

  ngOnInit() {}

  ganarCarta() {
    // primero verificar si el usuario tiene cartas
    if (this.auth.profile?.cartas) {
      //si tiene cartas, agregar una nueva
      this.auth.profile.cartas.push({ imagen: '', nombre: '' });
    }
    //luego actualizar el documento en firestore
    this.db.updateFireStoreDocument(
      //indico la colección
      'users',
      //indico el id del usuario
      this.auth.profile?.id,
      //indico el nuevo valor de la variable cartas
      { cartas: this.auth.profile?.cartas }
    )
  }

}
