const horariosCtrl = {}

var express = require('express');
var ibmdb = require("ibm_db")
let connStr = require("../database")
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

horariosCtrl.postHorario = async(req, res) => {

    console.log("horario que lego :", req.body);
    horario = req.body;
    console.log(horario);
    queryAsesoria = `INSERT INTO horario (DIA,LUGAR,HORA_INICIO,HORA_FIN,TIPO_REUNION_ID_TIPO_REUNION,USUARIO_ID_USUARIO,TIPO_ASESORIA_ID_TIPO_ASESORIA) 
    values ('${horario.DIA}','${horario.LUGAR}','${horario.HORA_INICIO}','${horario.HORA_FIN}','${horario.TIPO_REUNION_ID_TIPO_REUNION}','${horario.USUARIO_ID_USUARIO}','${horario.TIPO_ASESORIA_ID_TIPO_ASESORIA}')`;

    queryDiagnostico = `INSERT INTO horario (DIA,LUGAR,HORA_INICIO,HORA_FIN,TIPO_REUNION_ID_TIPO_REUNION,USUARIO_ID_USUARIO) 
    values ('${horario.DIA}','${horario.LUGAR}','${horario.HORA_INICIO}','${horario.HORA_FIN}','${horario.TIPO_REUNION_ID_TIPO_REUNION}','${horario.USUARIO_ID_USUARIO}')`;

    query = '';

    if (horario.TIPO_REUNION_ID_TIPO_REUNION == 1) { query = queryDiagnostico } else if (horario.TIPO_REUNION_ID_TIPO_REUNION == 2) { query = queryAsesoria }

    await ibmdb.open(connStr, (err, conn) => {




        conn.query(query, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error INSERTANDO HORARIO" + err);
            } else {

                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json({ data: "se guardo el horario" });
            }
        })
    })
}


horariosCtrl.getHorarios = async(req, res) => {
    const { id } = req.params;
    console.log("codigo usuario que hizo la solicitud:", id);
    await ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM horario WHERE usuario_id_usuario =${id} ORDER BY id_horario`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda DE HORARIOS" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })
}

horariosCtrl.getTipoReunion = async(req, res) => {

    console.log('entro a gettiposreunion');
    await ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM tipo_reunion`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error buscando tipos de reunion en la BD" + JSON.stringify(err));
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })

}

horariosCtrl.getTiposAsesorias = async(err, res) => {
    console.log('entro a gettiposasesorias');
    await ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM tipo_asesoria`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error buscando tipos de asesorias en la BD" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })
}

horariosCtrl.deleteHorario = async(req, res) => {

    const { id } = req.params;
    await ibmdb.open(connStr, (err, conn) => {

        conn.query(`DELETE FROM disponibilidad WHERE horario_id_horario=${id} AND id_estudiante IS NULL `, (err, data) => {
            if (err) {
                res.json({
                    fallo: true,
                    error: err
                })
                console.log("Hubo un error haciendo el delete disponibilidad" + err);
            } else {
                conn.query(`DELETE FROM horario WHERE id_horario =${id}`, (err, data) => {
                    if (err) {
                        res.json({
                            fallo: true,
                            error: err
                        })
                        console.log("Hubo un error haciendo el delete horario" + err);
                    } else {
                        conn.close(() => {
                            console.log("Se ha cerrado la base de datos")
                        })
                        res.json({ data: 'se borro el horario y las disponibilidaes' })
                    }
                })
            }
        })



    })

}

// horariosCtrl.updateHorario = async(req, res) => {

//     horario = req.body;
//     console.log('horario que se va a actualizar :', horario);

//     await ibmdb.open(connStr, (err, conn) => {

//         conn.query(`UPDATE horario SET dia='${horario.DIA}', hora_inicio='${horario.HORA_INICIO}',hora_fin='${horario.HORA_FIN}',tipo_asesoria_id_tipo_asesoria=${horario.TIPO_ASESORIA_ID_TIPO_ASESORIA},tipo_reunion_id_tipo_reunion=${horario.TIPO_REUNION_ID_TIPO_REUNION} WHERE id_horario=${horario.ID_HORARIO}`, (err, data) => {
//             if (err) {
//                 res.json({ error: err })
//                 console.log("Hubo un error haciendo el UPDATE horario" + err);
//             } else {
//                 conn.close(() => {
//                     console.log("Se ha cerrado la base de datos")
//                 })
//                 res.json({ data: 'se actualizo el horario' })
//             }
//         })
//     })

// }

horariosCtrl.getDisponibilidadeslibreshorario = async(req, res) => {

    const { id } = req.params;
    console.log("codigo horario que se traeran disponibilidades:", id);
    await ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM disponibilidad WHERE horario_id_horario =${id} AND id_estudiante IS NULL  ORDER BY id_disponibilidad`, (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda DE DISPONIILIDADES" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data)
            }
        })
    })


}

horariosCtrl.postDisponibilidades = async(req, res) => {

    disponibilidades = req.body;
    console.log('disponibiliddessss:', disponibilidades);
    await ibmdb.open(connStr, (err, conn) => {

        for (var i = 0; i <= 3; i++) {
            conn.query(`INSERT INTO disponibilidad (horario_id_horario,fecha) 
        values ('${disponibilidades.HORARIO_ID_HORARIO}','${disponibilidades.FECHA[i]}')`, (err, data) => {
                if (err) {
                    res.json({ error: err })
                    console.log("Hubo un error haciendo el INSERT disponibilidades" + err);
                } else {

                    console.log(`guardo la disponibilidad :${i}`);
                }
            })
        }
        conn.close(() => {
            console.log("Se ha cerrado la base de datos")
        })
        res.json({ data: 'se guardo las disponibilidades' })
    })


}



module.exports = horariosCtrl;