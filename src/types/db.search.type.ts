import { DbCrudType } from "./db.crud.type";

export interface DbSearchType extends DbCrudType {
    searchOption?: string;
    searchKeyword?: string;
    searchDateStart?: string;
    searchDateEnded?: string;
}