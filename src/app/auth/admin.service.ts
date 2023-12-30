import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  userCollection: AngularFirestoreCollection<any>;
  path = 'users';

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection(this.path);
  }

  getData(): Observable<any[]> {
    return this.userCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as User; // TODO: check here
          return { uid: a.payload.doc.id, ...data };
        });
      }),
      // take(1)
    );
  }


  create(user: User) {
    const data = JSON.parse(JSON.stringify(user));
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `${this.path}/${user.uid}`
    );
    return userRef.set(data);
    // return this.userCollection.add(data);
  }

  getUserById(uid: string) {
    return this.getById(uid).valueChanges();
  }

  getById(id: string) {
    return this.afs.doc<any>(`${this.path}/${id}`);
  }

  update(id: string, data: User) {
    // TODO: check partial update vs full update
    // console.log(this.getById(id));
    return this.getById(id).update(data);
  }

  deleteById(id: string) {
    return this.getById(id).delete().then(() => {
    });
  }
}
