var ibmdb = require("ibm_db")

// connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=bhl57935;PWD=9b014l94rnsv9t-k;"; //IVAN
connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=gkv32997;PWD=sqj5b23b+ghv5q9x;"; //THOMAS

console.log("Se conectó correctamente a la DB");
module.exports = connStr;