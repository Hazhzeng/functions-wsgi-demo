create table tag (
	Id INT auto_increment primary key,
	Tag VARCHAR(128) unique not null,
	DateAddedUtc DATETIME not null default now()
);

create index IX_TAG_TAG on tag(Tag);