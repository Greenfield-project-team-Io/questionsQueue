import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import CodeZone from './CodeZone.jsx';

class CodeToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCode: false };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    const showCode = !this.state.showCode;
    this.setState({ showCode });
  }
  render() {
    const label = this.state.showCode ? 'Hide Code' : 'Show Code';
    const codeZone = this.state.showCode
      ? (<CodeZone codeSnippet={this.props.codeSnippet} readOnly={this.props.readOnly} />)
      : null;

    return (
      <div>
        <FlatButton onClick={this.toggle} label={label} />
        {codeZone}
      </div>
    )
  }
}

export default CodeToggle;
