import React from 'react';

import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  }
});

const Editor = ({ classes }) => {
  return (
    <div>
      <TextField
          label="title"
          className={classes.textField}
          fullWidth
          margin="normal"
      />
      <TextField
          label="tag"
          className={classes.textField}
          fullWidth
          margin="normal"
      />
      <TextField
          label="text"
          className={classes.textField}
          fullWidth
          margin="normal"
          multiline
          rows={8}
          rowsMax={100}
      />
    </div>
  )
};

export default withStyles(styles)(Editor);
