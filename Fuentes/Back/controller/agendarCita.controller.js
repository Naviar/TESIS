const agendarCitaCtrl = {}

var express = require('express');
var ibmdb = require("ibm_db")

let connStr = require("../database")
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../models/config');

//hola
//////////////////////////////////////////////////////////////////////////////

agendarCitaCtrl.getHorarios = async(req, res) => {

    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM horario WHERE tipo_reunion_id_tipo_reunion =${1}`, (err, data) => {
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


agendarCitaCtrl.getHorarioId = async(req, res) => {
    let id = req.params.id;
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM horario WHERE id_horario='${id}'`, (err, data) => {
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

agendarCitaCtrl.getDisponibilidadId = async(req, res) => {
    let id = req.params.id;
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM disponibilidad WHERE id_disponibilidad='${id}'`, (err, data) => {
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

agendarCitaCtrl.disponibilidadesLibres = async(req, res) => {
    // console.log("lo que llega",req.body);
    let id = req.body.HORARIO_ID_HORARIO;
    let fecha = req.body.FECHA;
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM horario WHERE id_horario='${id}' AND NOT EXISTS (SELECT id_disponibilidad FROM disponibilidad WHERE disponibilidad.horario_id_horario = horario.id_horario AND disponibilidad.fecha = '${fecha}');`, (err, data) => {
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

agendarCitaCtrl.disponibilidadesOcupadas = async(req, res) => {
    // console.log("lo que llega",req.body);
    let id = req.body.HORARIO_ID_HORARIO;
    let fecha = req.body.FECHA;
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM horario WHERE id_horario='${id}' AND EXISTS (SELECT id_disponibilidad FROM disponibilidad WHERE disponibilidad.horario_id_horario = horario.id_horario AND disponibilidad.fecha = '${fecha}');`, (err, data) => {
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
agendarCitaCtrl.agendarCita = (req, res) => {

    // console.log("hasata aqui vamos con esto", req.body.estudiante_id);
    // let id_diagnostico = req.body.id_diagnostico;    
    let fecha = req.body.fecha;
    let horario_id = req.body.horario_id;
    let estudiante_id = req.body.estudiante_id;


    var query = `INSERT INTO disponibilidad (fecha, id_estudiante, horario_id_horario) VALUES ('${fecha}','${estudiante_id}','${horario_id}')`;


    ibmdb.open(connStr, function(err, conn) {
        if (err) return console.log(err);

        conn.query(query, function(err, data) {
            if (err) res.json({ error: err })
            else {
                conn.close(function() {
                    console.log('Se ha cerrado la base de datos correctamente');
                });
                res.json("lo lograste");
            }
        });
    });
}

////////////////////////////////////ASESORIAS/////////////////////////////////////////////////

agendarCitaCtrl.getAsesorias = async(req, res) => {

    const { id_estudiante } = req.params;


    console.log('req.params id estudianteeeeee:', id_estudiante);

    query = `select count(formato_asesoria_id_formato_asesoria), case when count(formato_asesoria_id_formato_asesoria) !='0' then  ( select fa.tipo_asesoria_id_tipo_asesoria from formato_asesoria  as fa  where id_formato_asesoria =(select MAX(formato_asesoria_id_formato_asesoria) from estudiante_has_formato_asesoria where estudiante_id_estudiante = '${id_estudiante}') )  END from estudiante_has_formato_asesoria where estudiante_id_estudiante='${id_estudiante}'`

    ibmdb.open(connStr, (err, conn) => {
        if (err) return console.log("Aja el error", err);
        conn.query(query, (err, data) => {

            if (err) {
                res.json({ error: true, msg: err })
                console.log("Hubo un error en la busqueda" + err);
            } else if (data[0][1] == 0 || data[0][2] == null) {
                console.log('data[0][1]', data[0][1]);
                var query2 = `select fd.tipo_asesoria_id_tipo_asesoria from formato_diagnostico as fd where id_formato_diagnostico = (select formato_diagnostico_id_diagnostico from estudiante where id_estudiante='${id_estudiante}') `
                conn.query(query2, (err, data2) => {

                    if (err) { res.json({ error: true, msg: err }) } else {
                        console.log('esta respondiendo con esto', data2);
                        ///// le devuelve los horariosde la asesoria del diagnostico

                        conn.query(`SELECT * FROM horario WHERE tipo_reunion_id_tipo_reunion =${2} AND tipo_asesoria_id_tipo_asesoria = ${data2[0]['TIPO_ASESORIA_ID_TIPO_ASESORIA']}`, (err, data) => {
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

                        ///////////////////////////////////////////////////////////////
                    }

                });
            } else {
                console.log('respondio con esto', data[0][2]);
                const id_asesoria = data[0][2];

                conn.query(`SELECT * FROM horario WHERE tipo_reunion_id_tipo_reunion =${2} AND tipo_asesoria_id_tipo_asesoria = ${data[0][2]}`, (err, data) => {
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


            }
        })
    })

    // ibmdb.open(connStr, (err, conn) => {

    //     conn.query(`SELECT * FROM horario WHERE tipo_reunion_id_tipo_reunion =${2}`, (err, data) => {
    //         if (err) {
    //             res.json({ error: err })
    //             console.log("Hubo un error en la busqueda DE HORARIOS" + err);
    //         } else {
    //             conn.close(() => {
    //                 console.log("Se ha cerrado la base de datos")
    //             })
    //             res.json(data)
    //         }
    //     })
    // })
}
agendarCitaCtrl.asesoriasLibres = async(req, res) => {
    console.log("lo que llega", req.body);
    let id = req.body.HORARIO_ID_HORARIO;
    let fecha = req.body.FECHA;
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT h.*, t.nombre_tipo_asesoria FROM horario AS h INNER JOIN tipo_asesoria AS t ON h.tipo_asesoria_id_tipo_asesoria = t.id_tipo_asesoria WHERE h.id_horario='${id}' AND t.activo = '${true}' AND NOT EXISTS (SELECT id_disponibilidad FROM disponibilidad WHERE disponibilidad.horario_id_horario = h.id_horario AND disponibilidad.fecha = '${fecha}');`, (err, data) => {
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
agendarCitaCtrl.asesoriasOcupadas = async(req, res) => {
    console.log("lo que llega", req.body);
    let id = req.body.HORARIO_ID_HORARIO;
    let fecha = req.body.FECHA;
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT h.*, t.nombre_tipo_asesoria FROM horario AS h INNER JOIN tipo_asesoria AS t ON h.tipo_asesoria_id_tipo_asesoria = t.id_tipo_asesoria WHERE h.id_horario='${id}' AND t.activo = '${true}' AND EXISTS (SELECT id_disponibilidad FROM disponibilidad WHERE disponibilidad.horario_id_horario = h.id_horario AND disponibilidad.fecha = '${fecha}');`, (err, data) => {
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

module.exports = agendarCitaCtrl;