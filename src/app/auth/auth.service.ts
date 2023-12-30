import {AdminService} from './admin.service';
import {LocalStorageService} from './../services/local-storage.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'firebase/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User} from '../models/user';
import {NotificationService} from '../core/notification/notification.service';
import {ShopService} from '../services/shop.service';
import {Shop} from '../models/shop';

const authMessages = {
  loginSuccessful: 'Добро пожаловать!',
  registerSuccessful: 'Регистрация успешно завершена!',
  resetSuccessful: 'Ссылка отправлена на почту!',
  loginFailed: 'Добро пожаловать!',
  'auth/user-not-found': 'Пользователь не существует',
  'auth/wrong-password': 'Неправильный пароль',
  'auth/email-already-in-use': 'Адрес электронной почты уже используется другим аккаунтом',
};

@Injectable()
export class AuthService {
  user: Observable<User | null>;
  usersCollection = 'users';

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private notify: NotificationService,
    private shopService: ShopService,
    private router: Router,
    private localStrage: LocalStorageService,
    private adminService: AdminService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`${this.usersCollection}/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  emailSignUp(email: string, password: string, fullName: string, role: 'admin' | 'shop'): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        const user = Object.assign({}, credential.user);
        user.displayName = fullName;
        this.notify.update(authMessages.registerSuccessful, 'success');
        return this.updateUserData(user, role);
      })
      .catch(error => {
        error.message = authMessages[error.code] || error.message;
        this.handleError(error);
        return Promise.reject(error);
      });
  }

  //// Email/Password Auth ////
  emailLogin(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.notify.update(authMessages.loginSuccessful, 'success');
        return res.user.uid;
      })
      .catch(error => {
        error.message = authMessages[error.code] || error.message;
        this.handleError(error);
        return Promise.reject(error);
      });
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.notify.update(authMessages.resetSuccessful, 'info');
        this.router.navigate(['/login']);
      })
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/main']);
      this.localStrage.deleteShop();
      this.localStrage.deleteAdmin();
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after successful login
  private updateUserData(user: any, role: 'admin' | 'shop'): Promise<any> {
    if (role === 'admin') {
      const data: User = {
        uid: user.uid,
        email: user.email || null,
        fullName: user.displayName || 'Без имени',
        activated: false,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return this.adminService.create(data)
        .then((docRef) => {
          return Promise.resolve(data);
        });
    } else {
      const shop = new Shop();
      shop.name = user.displayName;
      shop.email = user.email;
      shop.firebaseId = user.uid;
      return this.shopService.create(shop);
    }
  }
}
