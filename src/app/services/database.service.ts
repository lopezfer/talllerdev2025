import { Injectable, Injector, NgZone, runInInjectionContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    public http: HttpClient,
    public firestore: AngularFirestore,
    private injector: Injector,
    private zone: NgZone
  ) { }

  // Lee un archivo local
  fetchLocalCollection(collection: string) {
    return this.http.get('assets/db/' + collection + '.json');
  }

  // 🔄 Método general para forzar ejecución en NgZone
  private wrapInNgZone<T>(source$: Observable<T>): Observable<T> {
    return new Observable<T>((observer) => {
      return source$.subscribe({
        next: (val) => this.zone.run(() => observer.next(val)),
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      });
    });
  }

  fetchFirestoreCollection(collection: string): Observable<any[]> {
    const raw$ = runInInjectionContext(this.injector, () =>
      this.firestore.collection(collection).valueChanges({ idField: 'id' })
    );
    return this.wrapInNgZone(raw$);
  }

  addFirestoreDocument(collectionName: string, collectionData: any) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection(collectionName).add(collectionData);
    });
  }

  updateFireStoreDocument(collection: string, uid: string, data: any) {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection(collection).doc(uid).update(data);
    });
  }

  deleteFireStoreDocument(collection: string, id: string): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      return this.firestore.collection(collection).doc(id).delete();
    });
  }

  getDocumentById(collection: string, uid: string): Observable<any> {
    const raw$ = runInInjectionContext(this.injector, () =>
      this.firestore.collection(collection).doc(uid).valueChanges({ idField: 'id' })
    );
    return this.wrapInNgZone(raw$);
  }

  getCollectionByCustomparam(collection: string, customParam: string, searched: string): Observable<any> {
    const raw$ = runInInjectionContext(this.injector, () =>
      this.firestore.collection(collection, ref =>
        ref.where(customParam, '==', searched)
      ).valueChanges({ idField: 'id' })
    );
    return this.wrapInNgZone(raw$);
  }

  searchCollectionByFieldPrefix(collection: string, field: string, searchText: string): Observable<any[]> {
    const endText = searchText.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));
    const raw$ = runInInjectionContext(this.injector, () =>
      this.firestore.collection(collection, ref =>
        ref.where(field, '>=', searchText).where(field, '<', endText)
      ).valueChanges({ idField: 'id' })
    );
    return this.wrapInNgZone(raw$);
  }

  getCollectionByFilters(
    collection: string,
    filters: { field: string, operator: firebase.default.firestore.WhereFilterOp, value: any }[],
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
    limitResults?: number
  ): Observable<any[]> {
    const raw$ = runInInjectionContext(this.injector, () =>
      this.firestore.collection(collection, ref => {
        let query: firebase.default.firestore.CollectionReference | firebase.default.firestore.Query = ref;
        filters.forEach(filter => {
          query = query.where(filter.field, filter.operator, filter.value);
        });
        if (orderByField) {
          query = query.orderBy(orderByField, orderDirection);
        }
        if (limitResults) {
          query = query.limit(limitResults);
        }
        return query;
      }).valueChanges({ idField: 'id' })
    );
    return this.wrapInNgZone(raw$);
  }

  getAllSubcollectionGroup(subcollection: string): Observable<any[]> {
    const raw$ = runInInjectionContext(this.injector, () =>
      this.firestore.collectionGroup(subcollection).valueChanges({ idField: 'id' })
    );
    return this.wrapInNgZone(raw$);
  }

  filterSubcollectionGroupByField(
    subcollection: string,
    field: string,
    value: any
  ): Observable<any[]> {
    const raw$ = runInInjectionContext(this.injector, () =>
      this.firestore
        .collectionGroup(subcollection, ref => ref.where(field, '==', value))
        .valueChanges({ idField: 'id' })
    );
    return this.wrapInNgZone(raw$);
  }

  /*
  this.db.getAllSubcollectionGroup('menu').subscribe(console.log);

  this.db.filterSubcollectionGroupByField('menu', 'name', 'Hamburguesa doble').subscribe(console.log);
   */


}
