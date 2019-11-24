CREATE TABLE PristineBlog (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	AuthorId INT not null,
	Title VARCHAR(128) not null,
	Text TEXT null,
	LastUpdateDateUtc DATETIME null,
	FOREIGN KEY (AuthorId) REFERENCES PristineUser(Id)
);

CREATE INDEX IX_BLOG_AUTHORID ON PristineBlog(AuthorId);
CREATE INDEX IX_BLOG_TITLE ON PristineBlog(Title);
