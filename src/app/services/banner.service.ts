import { Slider } from './../models/slider';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  bannerCollection: AngularFirestoreCollection<any>;
  path = 'bannners';

  constructor(private afs: AngularFirestore) {
    this.bannerCollection = this.afs.collection(this.path);
  }

  getData(): Observable<any[]> {
    return this.bannerCollection.snapshotChanges().pipe(
      take(1),
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Slider; // TODO: check here
          return {uid: a.payload.doc.id, ...data};
        });
      })
    );
  }

  create(banner: Slider) {
    // we need to stringify this because banner class contains nested arrays(objects)
    const parsedBanner = JSON.parse(JSON.stringify(banner));
    return this.bannerCollection.add(parsedBanner);
  }

  getBannerId(uid: string) {
    return this.getById(uid).valueChanges();
  }

  getById(id: string) {
    return this.afs.doc<any>(`${this.path}/${id}`);
  }

  update(id: string, data: Slider) {
    // TODO: check partial update vs full update
    return this.getById(id).update(data);
  }

  deleteById(id: string) {
    return this.getById(id).delete();
  }
}
