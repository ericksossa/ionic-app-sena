import { Action } from '@ngrx/store';
import { UploadFile } from './upload-file.interface';


export const SET_ITEMS = '[Items] Set Items';
export const UNSET_ITEMS = '[Items] Unset Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;
    constructor(public items: UploadFile[]) { }
}


export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

export type acciones = SetItemsAction |
                        UnsetItemsAction;
