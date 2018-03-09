CREATE TABLE usuario (
	id serial NOT NULL,
    login character varying(100) NOT NULL,
    senha character varying(100) NOT NULL,
    ativo boolean,
    CONSTRAINT usuario_pk PRIMARY KEY (id)
)
WITH (
	OIDS=FALSE
);

ALTER TABLE usuario OWNER TO postgres;

CREATE TABLE usuarioacesso (
	usuario bigint NOT NULL,
    acesso character varying(70),
    CONSTRAINT usuario_fk FOREIGN KEY (usuario)
    	REFERENCES usuario(id) MATCH SIMPLE
    	ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
    OIDS=FALSE
);

ALTER TABLE usuarioacesso OWNER TO postgres;