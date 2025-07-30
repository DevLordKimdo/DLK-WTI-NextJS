import { DbCrudType } from "./db.crud.type";

export interface DbTransactionalType extends DbCrudType {
    errorOption?: String;
    transOption?: String;
}