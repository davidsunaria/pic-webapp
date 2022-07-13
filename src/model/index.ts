import common, { CommonModel } from "./Common";
import detail, { DetailModel } from "./Detail";

export interface StoreModel {
  common: CommonModel;
  detail: DetailModel;
}

const model: StoreModel = {
  common,
  detail,
};

export default model;
