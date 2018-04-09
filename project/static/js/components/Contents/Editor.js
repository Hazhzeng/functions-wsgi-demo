import React from 'react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: "80%",
  }
});

const Editor = ({
  classes,
  blogTitle,
  blogTag,
  blogText,
  handleChangeTitle,
  handleChangeTag,
  handleChangeText,
  submitBlog,
}) => {
  return (
    <div>
      <TextField
        label="title"
        className={classes.textField}
        fullWidth={true}
        margin="normal"
        value={blogTitle}
        onChange={(event) => handleChangeTitle(event.target.value)}
      />
      <TextField
        label="tag"
        className={classes.textField}
        fullWidth={true}
        margin="normal"
        value={blogTag}
        onChange={(event) => handleChangeTag(event.target.value)}
      />
      <TextField
        label="text"
        className={classes.textField}
        fullWidth={true}
        margin="normal"
        multiline
        rows={20}
        rowsMax={20}
        value={blogText}
        onChange={(event) => handleChangeText(event.target.value)}
      />
      <Button
        color="primary"
        onClick={submitBlog}
        fullWidth
      >
      Submit
      </Button>
    </div>
  )
};

export default withStyles(styles)(Editor);
