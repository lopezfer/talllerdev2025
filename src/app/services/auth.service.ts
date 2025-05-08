import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  profile: any;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public db: DatabaseService,
    public router: Router,
    private injector: Injector
  ) { }

  registerUser(email: string, password: string, extraData: any) {
    return runInInjectionContext(this.injector, () => {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const uid = userCredential.user?.uid;
          if (uid) {
            return runInInjectionContext(this.injector, () => {
              return this.firestore.collection('users').doc(uid).set(extraData);
            });
          }
          throw new Error('Usuario no creado');
        });
    });
  }

  getProfile(uid: any) {
    return runInInjectionContext(this.injector, () => {
      this.db.getDocumentById('users', uid).subscribe(
        (res: any) => {
          console.log('perfil desde firebase', res);
          localStorage.setItem('profile', JSON.stringify(res));
          this.profile = res;
        },
        (error: any) => {
          console.log(error);
        }
      );
    });
  }

}
