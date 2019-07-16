var ibmdb = require("ibm_db")

connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=chk19332;PWD=chthdv8mfzm3g+t3;"; //IVAN
// connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=vnh98091;PWD=4f-t4n3qkgv6vpb4;"; //THOMAS

console.log("Se conectó correctamente a la DB");
module.exports = connStr;