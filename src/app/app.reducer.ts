import { ActionReducerMap } from '@ngrx/store';
import * as fromUI from './auth/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromUpload from './services/upload-file/upload-file.reducer';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    uploadFile: fromUpload.UploadFileState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    uploadFile: fromUpload.uploadFileReducer,
};
