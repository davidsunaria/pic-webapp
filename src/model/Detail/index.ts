import { StoreModel } from 'react-app-model';
import { Action, action, Thunk, thunk} from "easy-peasy";
import { toast } from "react-toastify";
import { getApi} from 'react-app-api';
import { IPayload } from 'react-app-interfaces';


const initialState = {
  eventResponse: {},
  groupResponse:{}
}
export interface DetailModel {
  eventResponse: string | object | any;
  groupResponse: string | object | any;
  //**************State Actions************///
  reset: Action<DetailModel>;
  setEventResponse: Action<DetailModel, object | any>;
  setGroupResponse:Action<DetailModel, object | any>;
  //**************State  Actions************///

  //**************Thunk Actions************///
  getEvent: Thunk<DetailModel, object>;
  getGroup:Thunk<DetailModel, object>;
  //**************Thunk Actions************///
}

const detail: DetailModel = {

  ...initialState,
  setEventResponse: action((state, payload) => {
    state.eventResponse = payload;
  }),
  setGroupResponse: action((state, payload) => {
    state.groupResponse = payload;
  }),
 
  reset: action(state => state = initialState),
 
  getEvent: thunk<DetailModel, IPayload, any, StoreModel>(async (actions, payload: IPayload, { getStoreActions, getState }) => {
   // getStoreActions().common.setLoading(true);
    let response = await getApi(payload);
    if (response && response.status !== 200) {
      toast.error(response.message);
     // getStoreActions().common.setLoading(false);
    } else if (response && response.status === 200) {
      actions.setEventResponse(response.data);
     // getStoreActions().common.setLoading(false);
    }
    else {
      //getStoreActions().common.setLoading(false);
      return true;
    }
  }),

  getGroup: thunk<DetailModel, IPayload, any, StoreModel>(async (actions, payload: IPayload, { getStoreActions, getState }) => {
   // getStoreActions().common.setLoading(true);
    let response = await getApi(payload);
    if (response && response.status !== 200) {
      toast.error(response.message);
     // getStoreActions().common.setLoading(false);
    } else if (response && response.status === 200) {
      actions.setGroupResponse(response.data);
     // getStoreActions().common.setLoading(false);
    }
    else {
     // getStoreActions().common.setLoading(false);
      return true;
    }
  }),


  
};

export default detail;