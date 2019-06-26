import * as fromUploadFile from './upload-file.actions';
import { UploadFile } from './upload-file.interface';

export interface UploadFileState {
    items: UploadFile[];

}

const initState: UploadFileState = {
    items: []
};

export function uploadFileReducer(state = initState, action: fromUploadFile.acciones): UploadFileState {

    switch (action.type) {
        case fromUploadFile.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item => {
                        return { ...item };
                    })
                ]
            };
        case fromUploadFile.UNSET_ITEMS:
            return { items: [] };

        default:
            return state;
    }
}
