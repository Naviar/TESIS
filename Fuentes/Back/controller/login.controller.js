const loginCtrl = {}

const nodemailer = require('nodemailer');
var keygen = require("keygenerator");
var express = require('express');
var ibmdb = require("ibm_db")
let connStr = require("../database")
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../models/config');
//autenticacion para enviar correo
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'consultorio.usta.DRSU@gmail.com',
        pass: 'consultoriousta123'
    }
});

// Metodo encargado de listar todos los usuarios
loginCtrl.obtenerUsuarios = (req, res) => {

    console.log(req.info);

    ibmdb.open(connStr, (err, conn) => {

        conn.query("SELECT * FROM usuario", (err, data) => {
            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json({ data: data })
            }
        })
    })
}

loginCtrl.logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
}

//auntenticacion

loginCtrl.authentication = (req, res) => {



    let correo = req.body.correo;
    let password = req.body.password;
    let plataforma = req.body.plataforma;
    //info del usuario 
    let id_usuario;
    let rol_usuario;
    let nombre_usuario;
    let etapa_estudiante;

    ibmdb.open(connStr, (err, conn) => {
        if (err) { console.log(err) } else {
            conn.query(`SELECT * FROM usuario WHERE correo = '${correo}'`, (err, data) => {


                if (err) { res.send('Ocurrio un error en la busqueda' + err) } else {
                    //console.log(bcrypt.compareSync(password, data[0].PASSWORD))
                    if (data.length == 0) {
                        res.json({ fail: 1 })
                    } else if (bcrypt.compareSync(password, data[0].PASSWORD) != 1) {
                        res.json({ fail: 2 })
                    } else if (data[0].ACTIVO == false) {
                        res.json({ fail: 3 })
                    }
                    else {
                        console.log("NO ENTRO A NADA");
                        console.log("esto llega", data[0].ID_USUARIO);

                        id_usuario = data[0].ID_USUARIO;
                        rol_usuario = data[0].ROL_ID_ROL;
                        nombre_usuario = data[0].NOMBRE;
                        //Se crea un token con el id el correo y el rol
                        conn.query(`UPDATE usuario SET fecha = CURRENT_DATE WHERE id_usuario = ${id_usuario}`, (error, dato) => {
                            if (error) { res.send('Ocurrio un error en la busqueda' + error) } else {
                                if (data[0].ROL_ID_ROL !== 3) {

                                    token = jwt.sign({ id_usuario: id_usuario, rol_usuario: rol_usuario, nombre_usuario: nombre_usuario, plataforma: plataforma },
                                        config.secret, { expiresIn: 86400 }
                                    )
                                    //Se responde con el token de autenticacion
                                    res.json({ auth: true, token: token })
                                } else {
                                    conn.close();
                                    ibmdb.open(connStr, (err, conn) => {
                                        if (err) { console.log(err) } else {
                                            conn.query(`SELECT etapa,id_estudiante FROM estudiante WHERE usuario_id_usuario = ${id_usuario}`, (err, data) => {
                                                if (err) { res.send('Ocurrio un error en la busqueda' + err) } else {

                                                    console.log('id_estudiante :::::', data[0].ID_ESTUDIANTE);
                                                    token = jwt.sign({ id_usuario: id_usuario, rol_usuario: rol_usuario, nombre_usuario: nombre_usuario, id_estudiante: data[0].ID_ESTUDIANTE, plataforma: plataforma },
                                                        config.secret, { expiresIn: 86400 }
                                                    )
                                                    //Se responde con el token de autenticacion
                                                    res.json({ auth: true, token: token })

                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
                conn.close();
            })

        }
    })


}



loginCtrl.register = (req, res) => {


    let nombre = req.body.nombre_usuario;
    let apellido = req.body.apellido_usuario;
    let celular = req.body.celular;
    let correo = req.body.correo;
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let rol = req.body.rol;
    //Abriendo conexion a la base de datos

    ibmdb.open(connStr, (err, conn) => {

        if (err) { console.log("ERROR" + err); }
        else {
            //Metodo que hace el query

            conn.query(`INSERT INTO usuario (nombre, correo, password, apellido, celular, rol_id_rol, activo, fecha)
          VALUES ( '${nombre}', '${correo}', '${hashedPassword}', '${apellido}', '${celular}', '${rol}', '${false}', CURRENT_DATE)`
                , (err, data) => {
                    //Se cierra la conexion de la base de datos

                    if (err) {
                        res.status(500).send('Hubo un problema registrando el usuario ' + err)
                        console.log("Este es el error", err)
                    }
                    else {
                        conn.query(`select id_usuario from usuario order by id_usuario desc limit 0,1`, (err, data) => {
                            console.log("Se registro con este IDD", data[0].ID_USUARIO);

                            res.json({ auth: true })
                        })
                        conn.close()

                    }
                })
        }
    })
}



loginCtrl.getRoles = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {

        conn.query("SELECT * FROM rol", (err, data) => {


            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")

                })
                res.json(data);
            }
        })
    })
}
loginCtrl.getJornadas = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {

        conn.query("SELECT * FROM jornada", (err, data) => {


            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")

                })
                res.json(data);
            }
        })
    })
}
loginCtrl.getFacultades = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {

        conn.query("SELECT * FROM facultad", (err, data) => {

            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data);
            }
        })
    })
}
loginCtrl.getDocentes = (req, res) => {

    // console.log(req.info);
    ibmdb.open(connStr, (err, conn) => {

        conn.query(`SELECT * FROM usuario WHERE rol_id_rol = '${2}'`, (err, data) => {

            if (err) {
                res.json({ error: err })
                console.log("Hubo un error en la busqueda" + err);
            } else {
                conn.close(() => {
                    console.log("Se ha cerrado la base de datos")
                })
                res.json(data);
            }
        })
    })
}

loginCtrl.getIdUsuario = (req, res) => {

    let correo = req.params.correo;
    console.log(correo);
    var query = `SELECT id_usuario FROM usuario WHERE correo ='${correo}'`;

    ibmdb.open(connStr, function (err, conn) {
        if (err) return console.log(err);

        conn.query(query, function (err, data) {

            if (err) res.json({ error: err })
            else res.json(data)
            conn.close(function () {
                console.log('termino de buscar');
            });
        });
    });
}

loginCtrl.registerAsesor = (req, res) => {


    //datos pedidos para la solicitud

    let id_usuario = req.body.id_usuario;
    let id_facultad = req.body.facultad;
    //Abriendo conexion a la base de datos

    ibmdb.open(connStr, (err, conn) => {

        if (err) { console.log("ERROR" + err); } else {
            //Metodo que hace el query

            conn.query(`INSERT INTO asesor (usuario_id_usuario, facultad_id_facultad)
          VALUES ( '${id_usuario}', '${id_facultad}')`, (err, data) => {
                    //Se cierra la conexion de la base de datos
                    conn.close()
                    if (err) {
                        res.status(500).send('Hubo un problema registrando el usuario ' + err)
                        console.log("Este es el error", err)
                    } else res.json({ data: 'Se creo el asesor de manera satisfactoria!!!' })

                })
        }
    })
}
loginCtrl.registerDecano = (req, res) => {
    //datos pedidos para la solicitud
    let id_usuario = req.body.id_usuario;
    let id_facultad = req.body.facultad;
    //Abriendo conexion a la base de datos

    ibmdb.open(connStr, (err, conn) => {

        if (err) { console.log("ERROR" + err); } else {
            //Metodo que hace el query

            conn.query(`INSERT INTO decano (usuario_id_usuario, facultad_id_facultad)
          VALUES ( '${id_usuario}', '${id_facultad}')`, (err, data) => {
                    //Se cierra la conexion de la base de datos
                    conn.close()
                    if (err) {
                        res.status(500).send('Hubo un problema registrando el usuario ' + err)
                        console.log("Este es el error", err)
                    } else res.json({ data: 'Se creo el asesor de manera satisfactoria!!!' })

                })
        }
    })
}

loginCtrl.registerEstudiante = (req, res) => {

    //datos pedidos para la solicitud
    let codigo = req.body.codigo_estudiante;
    let semestre = req.body.semestre_estudiante;
    let id_jornada = req.body.jornada;
    let id_usuario = req.body.id_usuario;
    let id_facultad = req.body.facultad;
    //Abriendo conexion a la base de datos

    ibmdb.open(connStr, (err, conn) => {

        if (err) { console.log("ERROR" + err); } else {
            //Metodo que hace el query

            conn.query(`INSERT INTO estudiante (usuario_id_usuario, facultad_id_facultad, codigo, semestre, jornada_id_jornada, etapa)
          VALUES ( '${id_usuario}', '${id_facultad}', '${codigo}', '${semestre}', '${id_jornada}', '${0}')`, (err, data) => {
                    //Se cierra la conexion de la base de datos
                    conn.close()
                    if (err) {
                        res.status(500).send('Hubo un problema registrando el usuario ' + err)
                        console.log("Este es el error", err)
                    } else res.json({ data: 'Se creo el estudiante de manera satisfactoria!!!' })
                })
        }
    })
}

loginCtrl.usuarioDuplicado = (req, res) => {

    let correo = req.body.correo;
    let celular = req.body.celular;

    var query = `SELECT COUNT(*) AS duplicate from usuario where correo='${correo}' or celular='${celular}'`;

    ibmdb.open(connStr, function (err, conn) {
        if (err) return console.log(err);

        conn.query(query, function (err, data) {

            if (err) res.json({ error: err })
            else res.json(data)
            conn.close(function () {
                console.log('termino de buscar');
            });
        });
    });
}
loginCtrl.estudianteDuplicado = (req, res) => {
    let codigo = req.body.codigo_estudiante;
    console.log("esto codigo", req.body.codigo);

    var query = `SELECT COUNT(*) AS duplicate from estudiante and where codigo='${codigo}' `;

    ibmdb.open(connStr, function (err, conn) {
        if (err) return console.log(err);

        conn.query(query, function (err, data) {

            if (err) res.json({ error: err })
            else res.json(data)
            conn.close(function () {
                console.log('termino de buscar');
            });
        });
    });
}
loginCtrl.recoveryPassword = (req, res) => {
    recovery = req.body;

    console.log('llego esta info del recovery', recovery);

    query = `select password,recovery FROM usuario WHERE correo = '${recovery.correo}'`;

    ibmdb.open(connStr, (err, conn) => {
        conn.query(query, function (err, data) {
            if (err) { res.json({ error: err }) } else {
                if (data.length === 0) {
                    console.log('no esta registrado ese correo', data);

                    res.json({
                        exito: false,
                        mensaje: `el correo o codigo de cambio de contraseña son incorrectos`
                    })
                } else if (data[0].RECOVERY === recovery.key) {

                    console.log('se encontro este usuario', data);
                    var hashedPassword = bcrypt.hashSync(recovery.password, 8);
                    query2 = `UPDATE usuario SET password='${hashedPassword}' WHERE correo = '${recovery.correo}'`;

                    conn.query(query2, function (err, data) {
                        if (err) { res.json({ error: err }) } else {
                            res.json({
                                exito: true,
                                mensaje: `Se actualizo correctamente la contraseña para el usuario ${recovery.correo}`
                            })
                        }
                    });

                } else {
                    res.json({
                        exito: false,
                        mensaje: `El correo o codigo de cambio de contraseña son incorrectos`
                    })
                }
            }
            conn.close(() => {
                console.log("Se ha cerrado la base de datos")

            });
        });
    });


}

loginCtrl.recoveryCode = (req, res) => {

    var correo = req.body.correo;

    var key = keygen.password();

    var nombre = '';

    query = `SELECT * FROM usuario WHERE correo = '${correo}'`;
    query2 = `UPDATE usuario SET recovery = '${key}' WHERE correo='${correo}'`;

    ibmdb.open(connStr, (err, conn) => {
        conn.query(query, function (err, data) {
            if (err) { res.json({ error: err }) } else {
                if (data.length === 0) {
                    console.log('no esta registrado ese correo', data);

                    res.json({
                        exito: true
                    })
                } else {
                    console.log('se encontro este usuario', data[0].NOMBRE);
                    nombre = data[0].NOMBRE;
                    conn.query(query2, function (err, data) {
                        if (err) {
                            res.json({ error: err });
                        } else {

                            const mailOptions = {
                                from: 'consultorio.usta.DRSU@gmail.com', // dirección del remitente 
                                to: `${correo}`, // lista de los destinatarios del 
                                subject: 'CODIGO PARA RECUPERAR CONTRASEÑA PLATAFORMA DRSU', // Línea del asunto 
                                html: `<h1>Solicitud cambio de contraseña</h1>
                                    <p>Hola ${nombre} tu codigo para poder cambiar la contraseña es <b>${key}</b></p>
                                    <p>Si no solicitaste este codigo , haz caso omiso a este mensaje.</p>` // cuerpo de texto sin formato 
                            };

                            transporter.sendMail(mailOptions, function (err, info) {
                                if (err) {
                                    console.log(err)

                                    res.json({ exito: false });
                                } else {
                                    console.log(info);
                                    res.json({ exito: true });
                                    conn.close(() => {
                                        console.log("Se ha cerrado la base de datos")

                                    });
                                }

                            });
                        }
                    });


                }
            }
        });
    });

}

module.exports = loginCtrl