var ibmdb = require("ibm_db"),
    connString = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=vnh98091;PWD=4f-t4n3qkgv6vpb4;"; //THOMAS;

try {
    var option = { connectTimeout: 60, systemNaming: true }; // Connection Timeout after 60 seconds.
    var conn = ibmdb.openSync(connString, option);

} catch (e) {
    console.log(e.message);
}

module.exports = conn;