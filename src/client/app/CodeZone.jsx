import React from 'react';
import CodeMirror from 'codemirror';
import javascript from 'codemirror/mode/javascript/javascript';
import closeBrackets from 'codemirror/addon/edit/closebrackets';
import matchBrackets from 'codemirror/addon/edit/matchbrackets';

class CodeZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // codeEditor: null,
      readOnly: props.readOnly || false,
    };
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }


  handleCodeChange() {
    const codeSnippet = this.codeEditor.getValue();
    // create an object that mimics an event object.
    // provide the values that FormComponent expects for handleInputChange
    this.props.onChange({
      target: {
        value: codeSnippet,
        name: this.props.name,
      },
    });
  }

  componentDidMount() {
    // initialize CodeMirror
    this.codeEditor = CodeMirror.fromTextArea(this.refs.codeZone, {
      lineNumbers: true,
      mode: 'javascript',
      viewportMargin: 20,
      readOnly: this.state.readOnly,
      theme: 'neo',
      matchBrackets: true,
      autoCloseBrackets: true,
      // Hey legacy: Linting is cool and probably useful.
      // Not enabled here because the default linter hates ES6.
      // Check out the example on codemirror.net and reverse engineer it if you want to add.
      // lint: true,
    });
    this.codeEditor.on('change', this.handleCodeChange);
  }


  componentWillUnmount() {
    // end CodeMirror instance so element can unmount
    this.codeEditor.toTextArea();
  }

  // componentWillReceiveProps(newProps) {
  //   if (!this.state.readOnly) this.refs.codeZone.value = newProps.codeSnippet;
  // }

  render() {
    return (
      <textarea ref="codeZone" value={this.props.codeSnippet} />
    );
  }
}

export default CodeZone;
