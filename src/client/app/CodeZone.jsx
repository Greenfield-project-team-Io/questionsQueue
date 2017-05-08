import React from 'react';
import CodeMirror from 'codemirror';
import javascript from 'codemirror/mode/javascript/javascript';
import closeBrackets from 'codemirror/addon/edit/closebrackets';
import matchBrackets from 'codemirror/addon/edit/matchbrackets';
import lint from 'codemirror/addon/lint/lint';
import javascriptLint from 'codemirror/addon/lint/javascript-lint'

class CodeZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { codeEditor: null };
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  handleCodeChange() {
    const codeSnippet = this.state.codeEditor.getValue();
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
    this.state.codeEditor = CodeMirror.fromTextArea(this.refs.codeZone, {
      lineNumbers: true,
      mode: 'javascript',
      viewportMargin: 20,
      readOnly: this.state.readOnly,
      theme: 'neo',
      matchBrackets: true,
      autoCloseBrackets: true,
      // gutters: ['CodeMirror-lint-markers'],
      // lint: true,
    });
    this.state.codeEditor.on('change', this.handleCodeChange);
  }


  componentWillUnmount() {
    // end CodeMirror instance so element can unmount
    this.state.codeEditor.toTextArea();
  }

  render() {
    return (
      <textarea ref="codeZone" value={this.props.codeSnippet} />
    );
  }
}

export default CodeZone;
