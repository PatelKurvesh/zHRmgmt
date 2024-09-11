const cds = require("@sap/cds");

module.exports = (srv => {
    let {EMPLOYEE, Module, FILE} = srv.entities;

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

    srv.on("UPDATE", "EMPLOYEE", async (req) => {
        const { Image } = req.data;
        if (Image) {
          const tx = cds.transaction(req);
          await tx.run(UPDATE(EMPLOYEE).set({ Image: Image }).where({ ID: req.data.ID }));
        }
      });


    srv.on("readModule", async (req) => {
        let db = await cds.connect.to('db');
        let tx = db.tx();
        let sModuleType = req.data.MODULE_TYPE;
        try {
            var sQuery = `SELECT MODULE_ID,MODULE_NAME,MODULE_CODE FROM ${Module} WHERE MODULE_TYPE = '${sModuleType}'`;
            var aModule = await tx.run(sQuery);
            // var aModule = await tx.run(SELECT.from(Module).where(`MODULE_TYPE='${sModuleType}'`));
            var oModuleObj = {
                "Developed By": "Kurvesh Patel",
                "status": 200,
                "results": aModule
            };
            const {res} = req.http;
            res.send(oModuleObj);
        } catch (error) {
            console.log(error);
        }
    });


});
