namespace zHRmgmt__oData.db.schema;

using { managed } from '@sap/cds/common';

entity EMPLOYEE : managed {
    key EMP_ID: Integer;
        EMP_NAME:String;
        EMP_AGE:String;
        EMP_MODULE:Association to one MODULE;
        EMP_IMG:LargeBinary @Core.MediaType: 'image/png';
        IMG_URL : LargeString;
        EMP_CV: Association to one CV
                on EMP_CV.EMP = $self;
}

entity CV{
    key CV_ID    : UUID;

        @Core.MediaType  : MEDIA_TYPE
        CONTENT    : LargeBinary;

        @Core.IsMediaType: true
        MEDIA_TYPE : String;
        FILE_NAME  : String;
        URL        : String;
        EMP        : Association to one EMPLOYEE;
}

entity MODULE{
    key MODULE_ID:Int32;
    MODULE_NAME:String;
    MODULE_CODE:String;
    MODULE_TYPE:String;
}


