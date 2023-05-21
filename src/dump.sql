create database pdv;

create table usuarios(
  id serial primary key,
  nome text,
  email text not null unique,
  senha text not null
  )

create table categorias(
  id serial primary key,
  descricao text
  )
  
insert into categorias (descricao) values
 ('Informática'),
 ('Celulares'),
 ('Beleza e Perfumaria'),
 ('Mercado'),
 ('Livros e Papelaria'),
 ('Brinquedos'),
 ('Moda'),
 ('Bebê'),
 ('Games');

create table produtos(
	id serial primary key,	
	descricao text,
	quantidade_estoque integer not null,
	valor integer not null,
	categoria_id integer not null references categorias(id)
)



create table clientes(
  id serial primary key,
	nome text,
	email text not null unique,
	cpf integer not null unique,
	cep integer,
	rua text,
	numero integer,
	bairro text,
	cidade text,
	estado text
  )


create table pedidos(
	id serial primary key,
	cliente_id integer not null references clientes(id),
	observacao text,
	valor_total integer not null
	)


create table pedido_produtos(
	id serial primary key,
	pedido_id integer not null references pedidos(id),
	produto_id integer not null references produtos(id),
	quantidade_produto integer not null,
	valor_produto integer not null
	)



