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

const Editor = ({ classes, handleChangeText }) => {
  return (
    <div>
      <TextField
        label="title"
        className={classes.textField}
        fullWidth={true}
        margin="normal"
      />
      <TextField
        label="tag"
        className={classes.textField}
        fullWidth={true}
        margin="normal"
      />
      <TextField
        label="text"
        className={classes.textField}
        fullWidth={true}
        margin="normal"
        multiline
        rows={20}
        rowsMax={20}
        onChange={(event) => handleChangeText(event.target.value)}
      />
      <Button
        variant="raised"
        color="primary"
      >
      Submit
      </Button>
    </div>
  )
};

export default withStyles(styles)(Editor);
