create table blog (
	Id INT auto_increment primary key,
	AuthorId INT not null,
	Title VARCHAR(128) not null,
	Text TEXT null,
	LastUpdateDateUtc DATETIME null,
	foreign key (AuthorId) references user(Id)
);

create index IX_BLOG_AUTHORID on blog(AuthorId);
create index IX_BLOG_TITLE on blog(Title);