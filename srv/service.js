const cds = require("@sap/cds");

module.exports = (srv => {
    let {EMPLOYEE, MODULE, FILE} = srv.entities;

    srv.before("CREATE", EMPLOYEE, async (req) => {
        let db = await cds.connect.to('db');
        let tx = db.tx(req);
        try {
            let sQuery = `SELECT MAX(EMP_ID) AS COUNT FROM ${EMPLOYEE}`;
            let employeeTable = await tx.run(sQuery);
            employeeTable[0].COUNT = employeeTable[0].COUNT + 1;
            req.data.EMP_ID = employeeTable[0].COUNT;
        } catch (error) {
            console.log(error);
        }
    });

    srv.before("DELETE", EMPLOYEE, async (req) => {
        let {EMP_ID} = req.data;
        let oEmployeeObj = {
            "sMessage": "Employee deleted successfully",
            "sDeepMessage": `Emplpoyee ${EMP_ID} deleted successfully`
        };
        let {res} = req.http
        res.send(oEmployeeObj)
    });

    srv.on("readModule", async (req) => {
        let db = await cds.connect.to('db');
        let tx = db.tx(req);
        try {
            var sQuery = `SELECT MODULE_ID,MODULE_NAME,MODULE_CODE FROM ${MODULE} WHERE MODULE_TYPE=${
                req.data.MODULE_TYPE
            }`;
            var aModule = await tx.run(sQuery);
            var oModuleObj = {
                "Developed By": "Kurvesh Patel",
                "status": 200,
                "results": aModule
            };
            const {req} = req.http;
            res.send(oModuleObj);
        } catch (error) {
            req.reject(404, error);
        }
    });
})
