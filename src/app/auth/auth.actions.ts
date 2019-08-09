import { createAction, props} from '@ngrx/store';
import { User } from './user.model';



export const setUserAction = createAction(
    '[Auth] Set User',
    props<{user: User}>()
);

export const unSetUserAction = createAction(
    '[Auth] UnSet User'
);


// export class SetUserAction implements Action {
//     readonly type = SET_USER;
//     constructor(public user: User) { }
// }

// export class UnSetUserAction implements Action {
//     readonly type = UNSET_USER;
// }


// export type acciones = SetUserAction |
//                         UnSetUserAction;
