import { Action } from '@ngrx/store';

export const ACTIVATE_LOADING = '[UI Loading] Loading...';
export const DESACTIVATE_LOADING = '[UI Loading] Finished...';

export class ActivateLoadingAction implements Action {
    readonly type = ACTIVATE_LOADING;
}

export class DesactivateLoadingAction implements Action {
    readonly type = DESACTIVATE_LOADING;
}

export type acciones = ActivateLoadingAction |
                        DesactivateLoadingAction;
