import React, { Component } from 'react';
import '../styles/styles.css';

class SendPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promptText: ''
    }

    this._handleChange = this._handleChange.bind(this);
    this._submitForm = this._submitForm.bind(this);
  }

  _handleChange(event) {
    this.setState({promptText: event.target.value})
  }

  _submitForm(event) {
    this.props.sendPrompt(this.state.promptText)
    event.preventDefault();
    this.setState({promptText: ''})
  }

  render() {
    return(
      <div className="prompt-wrapper">
        <h2>Send a new prompt to all Pairachute pairs:</h2>
        <div className="prompt-input-container">
          <form onSubmit={this._submitForm}>
            <textarea value={this.state.promptText} className="prompt-input" name="prompt" rows="5" onChange={this._handleChange}></textarea>
            <input className="prompt-submit" type="submit" value="Send"/>
          </form>
        </div>
      </div>
    );
  }
}

export default SendPrompt;
