import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import WechatBarcode from '../../../image/wechat-barcode.jpg';

class WechatModal extends React.Component {
  constructor(props) {
    super(props);
    this.config = {
      style: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }
  }

  render() {
    return (
      <Modal
        aria-labelledby="Wechat Contact"
        aria-describedby="Wechat Barcode"
        open={this.props.isOpen}
        onClose={this.props.handleClose}
      >
        <div style={this.config.style} className={this.props.classes.paper}>
          <Typography variant="title" id="modal-title">
            Please scan with WeChat
          </Typography>
          <Typography align="center">
            <img src={`/dist/${WechatBarcode}`} width="320" />
          </Typography>
        </div>
      </Modal>
    );
  }
}

WechatModal.propTypes = ({
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
});

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
});

export default withStyles(styles)(WechatModal);