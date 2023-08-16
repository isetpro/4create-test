import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { IUser } from './user.model';

// export interface UsersState extends EntityState<IUser, string> {
//   ui: {
//     filter: VISIBILITY_FILTER
//   };
// }

// const initialState = {
//   ui: { filter: VISIBILITY_FILTER.SHOW_ALL }
// };

// @Injectable({
//   providedIn: 'root'
// })
// @StoreConfig({ name: 'todos' })
// export class UsersStore extends EntityStore<UsersState> {
//   constructor() {
//     super(initialState);
//   }
// }
