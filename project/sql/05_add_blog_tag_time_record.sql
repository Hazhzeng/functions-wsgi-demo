alter table blog_tag_map
	add column DateAddedUtc DATETIME default NOW();
	
create index IX_BLOG_TAG_MAP_DATEADDEDUTC on blog_tag_map(DateAddedUtc);