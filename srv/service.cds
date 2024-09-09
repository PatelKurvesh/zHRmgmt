namespace zHRmgmt__oData.srv.service;

using { zHRmgmt__oData.db.schema as db } from '../db/schema';

service zHRmgmt__oData @(path : '/odata') {

    entity Employee as projection on db.EMPLOYEE;
    entity Module as projection on db.MODULE;
    entity CV as projection on db.CV;

}
