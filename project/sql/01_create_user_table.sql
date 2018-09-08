create table user (
	Id INT auto_increment primary key,
	Username VARCHAR(32) not null,
	Salt VARCHAR(32) not null,
	Hash CHAR(32) null,
	Token CHAR(32) null,
	RegistrationDateUtc DATETIME null,
	LoginDateUtc DATETIME null,
	ExpiryDateUtc DATETIME null
);

create unique index IX_USER_USERNAME on user(Username);
create index IX_USER_REGISTRATIONDATEUTC on user(RegistrationDateUtc);