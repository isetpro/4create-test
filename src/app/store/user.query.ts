import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
// import { UsersState, UsersStore } from './users.store';

// @Injectable({
//   providedIn: 'root'
// })
// export class TodosQuery extends QueryEntity<UsersState> {
//   selectVisibilityFilter$ = this.select(state => state.ui.filter);

//   selectVisibleTodos$ = combineLatest(
//     this.selectVisibilityFilter$,
//     this.selectAll(),
//     this.getVisibleTodos
//   );

//   constructor(protected override store: UsersStore) {
//     super(store);
//   }

//   private getVisibleTodos(filter, todos): Todo[] {
//     switch (filter) {
//       case VISIBILITY_FILTER.SHOW_COMPLETED:
//         return todos.filter(t => t.completed);
//       case VISIBILITY_FILTER.SHOW_ACTIVE:
//         return todos.filter(t => !t.completed);
//       default:
//         return todos;
//     }
//   }
// }
