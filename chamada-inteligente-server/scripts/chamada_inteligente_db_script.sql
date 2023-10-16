CREATE DATABASE IF NOT EXISTS CHAMADA_INTELIGENTE_DB;
USE CHAMADA_INTELIGENTE_DB;

CREATE TABLE IF NOT EXISTS DEPARTAMENTO (
	id_departamento int primary key auto_increment,
    nome varchar(100) not null
);

CREATE TABLE IF NOT EXISTS CURSO (
	id_curso int primary key auto_increment,
    nome varchar(100) not null,
    id_departamento int not null,
	FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTO(id_departamento)
);

CREATE TABLE IF NOT EXISTS USUARIO (
	id_usuario int primary key auto_increment,
    email varchar(100) not null,
    nome varchar(100)  not null,
    senha varchar(20) not null,
    salt varchar(5) not null
);

CREATE TABLE IF NOT EXISTS PROFESSOR (
	id_professor int primary key,
    id_departamento int not null,
	FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTO(id_departamento),
    FOREIGN KEY (id_professor) REFERENCES USUARIO(id_usuario)
);

CREATE TABLE IF NOT EXISTS ALUNO (
	id_aluno int primary key,
	matricula int unique,
    id_curso int not null,
	FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso),
    FOREIGN KEY (id_aluno) REFERENCES USUARIO(id_usuario)
);

CREATE TABLE IF NOT EXISTS TURMA (
	id_turma int primary key auto_increment,
    nome varchar(100) not null,
    hora time not null,
    duracao int,
    id_professor int not null,
    id_curso int not null,
	FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso),
    FOREIGN KEY (id_professor) REFERENCES PROFESSOR(id_professor)
);

CREATE TABLE IF NOT EXISTS CHAMADA (
	id_chamada int primary key auto_increment,
    id_turma int not null,
	data_hora timestamp not null,
    FOREIGN KEY (id_turma) REFERENCES TURMA(id_turma)
);

CREATE TABLE IF NOT EXISTS PRESENCA (
	id_presenca int primary key auto_increment,
    hora time,
    validade boolean,
    atestado varchar(100),
    id_chamada int not null,
    matricula_aluno int not null,
	FOREIGN KEY (id_chamada) REFERENCES CHAMADA(id_chamada),
    FOREIGN KEY (matricula_aluno) REFERENCES ALUNO(matricula)
);

CREATE TABLE IF NOT EXISTS TURMA_ALUNO (
	id_turma int not null,
    matricula_aluno int not null,
    primary key (id_turma, matricula_aluno),
    FOREIGN KEY (id_turma) REFERENCES TURMA(id_turma),
    FOREIGN KEY (matricula_aluno) REFERENCES ALUNO(matricula)
);