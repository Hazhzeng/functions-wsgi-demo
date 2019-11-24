CREATE TABLE PristineUser (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Username VARCHAR(32) not null,
	Salt CHAR(32) not null,
	Hash CHAR(128) null,
	Token CHAR(32) null,
	RegistrationDateUtc DATETIME null,
	LoginDateUtc DATETIME null,
	ExpiryDateUtc DATETIME null
);

CREATE UNIQUE INDEX IX_USER_USERNAME ON PristineUser(Username);
CREATE INDEX IX_USER_REGISTRATIONDATEUTC ON PristineUser(RegistrationDateUtc);
