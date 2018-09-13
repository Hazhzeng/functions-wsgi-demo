import React from 'react';
import Grid from '@material-ui/core/Grid';
import { BlogPreviewWithStyle as BlogPreview } from './BlogPreview';

export class BlogPreviewList extends React.PureComponent {
  render() {
    return (
      <Grid item sm={12} lg={12}>
        {
          this.props.blogs.map(blog => (
            <BlogPreview
              key={blog.id}
              title={blog.title}
              tags={['1', '2', '3']}
              time={blog.updateDate}
              text={blog.text}
            />
          ))
        }
      </Grid>
    )
  }
}