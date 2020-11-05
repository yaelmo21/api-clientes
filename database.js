const mysql = require('mysql');

class DataBaseMyslq {

    conexion = mysql.createPool({
        host: 'sertecprofesional.com',
        database: 'sertecpr_clientes_yaelmo',
        user: 'sertecpr_clientes-y',
        password: process.env.PASSMYSQL,
    });

    getConnection = () => {
        if (this.conexion.state == 'disconnected') {
            this.conexion.connect((err => (err) ? console.log(err) : console.log('Conectado MYSQL'.blue)));
            return this.conexion;
        } else {
            return this.conexion;
        }
    }



}


module.exports = DataBaseMyslq;