--Crear base de datos
create database testAxosnet


--Creamos tabla recibos
create table recibos(
id_recibo int primary key identity,
proveedor varchar(50),
monto decimal (18,2),
moneda varchar(10),
fecha datetime ,
comentario varchar(200)
)

--Creamos tabla usuarios

create table usuarios(
id_usuario int primary key identity,
nombre varchar(50),
ap_paterno varchar(50),
ap_materno varchar(50),
email  varchar(50) ,
pass varchar(200)
)


--agregamos usuario
insert into usuarios
values('Sergio','Torres','Morales','smorales@ti.com.mx','7c276f8f204a344e2449a3503ca4be4a')--pass morales123.