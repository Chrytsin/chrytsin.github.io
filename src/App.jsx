import styles from './styles.css';
import React from 'react';
import Textbox from './textbox';
import infixToPostfix from './infixToPostfix';
import {isLetter} from './functions';
import Visualization from './Visualization';
 
class App extends React.Component {
 
  constructor (props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    this.state = {
      exp: '',
      inf: [],
      postfix: '',
      result: '',
      tog: false
    };
    console.log('APP CONSTRUCTOR', this.props);
  }
 
 
  handleChange(e) {
    console.log('HANDLECHANGE', e.target.value);     
    this.setState({exp: e.target.value});
    e.preventDefault();
  }
 
  handleSubmit = (e) => {
    console.log('HANDLESUBMIT', e.target.value);
    if(!isLetter(this.state.exp)) {
      this.setState({
        postfix: infixToPostfix(this.state.exp),
        result: eval(this.state.exp),
        inf: Array.from(this.state.exp),
        tog: true
      });
    } else {
      this.setState({
        postfix: infixToPostfix(this.state.exp),
        result: "Characters can not be calculated.",
        inf: Array.from(this.state.exp),
        tog: true
      });      
    }
    e.preventDefault();
    this.render();
  }
 
  handleAutosubmit(e) {
    console.log('HANDLEAUTOSUBMIT', e.target.value);
    e.preventDefault();
  }
 
  clearAll() {
    console.log('CLEARALL');
    this.setState({
      exp: '',
      postfix: '',
      result: '',
      inf: [],
      tog: false
    });
  }

  render() {
    console.log('APP RENDER');
    return(
      <div className="ui container">
        <div className="ui grid">
          <Textbox
            value = {(this.state.exp)}
            label = {"Infix"}
            onChange = {e => this.handleChange(e)}
            onSubmit = {e => this.handleSubmit(e)}
          />
          <div className="four wide column buttons">
            <button
              className = "ui positive button"
              onClick = {e => this.handleSubmit(e)}
            >
              Convert
            </button>
            <button
              className = "ui negative button"
              onClick = {e => this.clearAll(e)}
            >
              Clear
            </button>
          </div>
          <Textbox
            value = {this.state.postfix}
            label = {"Postfix"}
            onChange = {e => this.handleAutosubmit(e)}
            onSubmit = {e => this.handleAutosubmit(e)}
          />
          <Textbox
            value = {(this.state.result)}
            label = {"Result"}
            onChange = {e => this.handleAutosubmit(e)}
            onSubmit = {e => this.handleAutosubmit(e)}
          />
        </div>
        <Visualization
          exp = {this.state.inf} 
          toggle = {this.state.tog}
          onFinished = {() => {this.setState({tog:false})}} 
        />
      </div>
    );
  }
 
 
}
 
export default App;