#SCRIPT para la Base de Datos del Proyecto

CREATE DATABASE testselect;

use testselect;

SET FOREIGN_KEY_CHECKS = 0;

#tablas

CREATE TABLE login(idLogin INT NOT NULL AUTO_INCREMENT,userName VARCHAR(10) NOT NULL, password VARCHAR(10) not null, type varchar(10) NOT NULL, PRIMARY KEY(idLogin));

SET FOREIGN_KEY_CHECKS = 1;

GRANT ALL ON testselect.* TO root@localhost IDENTIFIED BY 'root';


#Insertando datos de ejemplo

INSERT INTO login(userName,password,type) VALUES('Said','said','1');
INSERT INTO login(userName,password,type) VALUES('Gis','gis','2');
INSERT INTO login(userName,password,type) VALUES('Alex','alex','3');
