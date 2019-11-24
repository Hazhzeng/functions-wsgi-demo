CREATE TABLE BlogTagMap (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	BlogId INT NOT NULL,
	TagId INT NOT NULL,
	foreign key (BlogId) references PristineBlog(Id),
	foreign key (TagId) references PristineTag(Id)
);

CREATE INDEX IX_BLOG_TAG_MAP_BLOGID ON BlogTagMap(BlogId);
CREATE INDEX IX_BLOG_TAG_MAP_TAGID ON BlogTagMap(TagId);
