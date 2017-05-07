import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import QuestionFormComponent from './QuestionFormComponent.jsx';

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleEdit(question) {
    this.props.handleEdit(question);
    this.handleClose();
  }
  render() {
    const buttons = [
    ];
    return (
      <span>
        <FlatButton label="Edit" onTouchTap={this.handleOpen} />
        <Dialog
          title="Edit Question"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          >
          <QuestionFormComponent
            question={this.props.question}
            handleEdit={this.handleEdit}/>
        </Dialog>
      </span>
    );
  }
}

export default EditComponent;
