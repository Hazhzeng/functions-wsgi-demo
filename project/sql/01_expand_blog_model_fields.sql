SELECT * FROM blog_model

CREATE TABLE blog_model_temp(
	id INTEGER PRIMARY KEY,
	user INTEGER,
	title VARCHAR(128) NOT NULL,
	tag VARCHAR(128),
	text VARCHAR(8192),
	last_update DATETIME NOT NULL,
	FOREIGN KEY(user) REFERENCES user_model(id)
)

INSERT INTO blog_model_temp (title, tag, text, last_update)
	SELECT title, tag, text, last_update
	FROM blog_model

DROP TABLE blog_model

CREATE TABLE blog_model(
	id INTEGER PRIMARY KEY ASC NOT NULL,
	user INTEGER,
	title VARCHAR(128) NOT NULL,
	tag VARCHAR(128),
	text VARCHAR(8192),
	last_update DATETIME NOT NULL,
	FOREIGN KEY(user) REFERENCES user_model(id)
)

INSERT INTO blog_model
	SELECT *
	FROM blog_model_temp

DROP TABLE blog_model_temp

DROP TABLE message_model

SELECT * FROM blog_model

UPDATE blog_model
	SET user=1

SELECT * FROM user_model