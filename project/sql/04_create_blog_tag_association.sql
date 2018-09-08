create table blog_tag_map (
	Id INT auto_increment primary key,
	BlogId INT not null,
	TagId INT not null,
	foreign key (BlogId) references blog(Id),
	foreign key (TagId) references tag(Id)
);

create index IX_BLOG_TAG_MAP_BLOGID on blog_tag_map(BlogId);
create index IX_BLOG_TAG_MAP_TAGID on blog_tag_map(TagId);