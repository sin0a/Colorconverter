import React, { Component } from 'react';
import './App.css';
import {toHex} from './conversions';
import {hexToRGB} from './conversions';
import {rgbToHSL} from './conversions';
import {hslToRGB} from './conversions';
import {validateInput} from './helper';
import {validateObjects} from './helper';
import {trigger} from './helper';
import {generateDongers} from './helper';

class App extends Component {

  constructor(props){
    super(props);
    // Objects for each color
    this.state = {'RGBA': {R: '', G: '', B: '', A: '' }};
    this.state = {'HSL': { H: '', S: '', L: '' }};
    this.state = {'HEX': ''};
    // bind the eventlistener simply to avoid putting 'this' for each call.
    this.onChange = this.onChange.bind(this);
  }
  // Actionlistener for the input fields
  onChange(event) {
    // Assign the objects to temp variables
    let rgba = Object.assign({}, this.state.RGBA);
    let hsl = Object.assign({}, this.state.HSL);
    // Validate objects: returns the objects as validated in a array
    let array = validateObjects(rgba,hsl);
    rgba = array[0];
    hsl = array[1];
    // Validate input: check if the user typed in any illegal values.
    if(validateInput(event)){
      // Simpel trigger function to handle where the event came from.
      var source = trigger(event, rgba, hsl);
      // Source decides what fields to calculate
      if(source[0] === "RGBA"){
        // source[1] contains the field that was changed, already set to the object
        rgba = source[1];
        this.setState({RGBA: rgba}, function () {
          // calculate the correspondent HEX value, using callback to avoid getting the existing value
          this.setState({HEX: toHex(rgba.R) + toHex(rgba.G) + toHex(rgba.B)}, function () {
            // calculate the correspondent HSL value
            hsl = rgbToHSL(rgba.R, rgba.G, rgba.B, hsl);
            this.setState({HSL: hsl});
          });
        });
      // if the user changed one of the hsl fields
      }else if(source[0] === "HSL"){
        // source[2] contains the field that was changed, already set to the object
        hsl = source[2];
        this.setState({HSL: hsl}, function () {
          // calculate RGBA
          rgba = hslToRGB(hsl.H, hsl.S, hsl.L, hsl);
          // Set both states and calculate HEX
          this.setState({
            RGBA: rgba,
            HEX: toHex(rgba.R) + toHex(rgba.G) + toHex(rgba.B)});
        });
      // if the user changed the hex field
    }else if(source[0] === "HEX"){
        this.setState({HEX: event.target.value}, function () {
          // calculate RGBA
          rgba = hexToRGB(this.state.HEX, rgba);
          // calculate HSL
          hsl = rgbToHSL(rgba.R, rgba.G, rgba.B, hsl);
          // Save to state
          this.setState({HSL: hsl});
          this.setState({RGBA: rgba});
        });
      }
    // if the value was not validated, reset the field
    }else{
      event.target.value = '';
    }
  // end of onChange
  }
  // Function for rendering the form
  renderObjects(){
    // temp variables for the color objects
    let rgba = Object.assign({}, this.state.RGBA);
    let hsl = Object.assign({},  this.state.HSL);
    // Validate the objects
    validateObjects(rgba,hsl);
    // ( ͡° ͜ʖ ͡°)
    var dongerList = generateDongers();
    // returns elements for rendering
      return (
        <div>
        <header className="App-header">
          <h1 className="App-title" style={{color: 'rgb('+ rgba.R +
          ','+ rgba.G +','+ rgba.B +')'}}>Colorconverter</h1>
        </header>
          <form>
            <label className="labelItem">
              <span style={{color: 'rgb('+ rgba.R +
              ',0,0)'}}>R</span><span style={{color: 'rgb(0,'+ rgba.G +',0)'}}>G</span>
              <span style={{color: 'rgb(0,0,'+rgba.B + ')'}}>B</span><span style={{opacity: rgba.A/100}}>A</span>: <br/>
              <input className="input-RGB" type="number" value={rgba.R} name="R" onChange={this.onChange}/>
              <input className="input-RGB" type="number" value={rgba.G} name="G" onChange={this.onChange}/>
              <input className="input-RGB" type="number" value={rgba.B} name="B" onChange={this.onChange}/>
              <input className="input-RGB" type="text"   value={rgba.A} name="A" onChange={this.onChange}/>
            </label>
            <br/>
            <label className="labelItem">
              HSL: <br/>
              <input className="input-HSL" type="text"  value={hsl.H} name="H" onChange={this.onChange}/>
              <input className="input-HSL" type="text"  value={hsl.S} name="S" onChange={this.onChange}/>
              <input className="input-HSL" type="text"  value={hsl.L} name="L" onChange={this.onChange}/>
            </label>
            <br/>
            <label className="labelItem">
              HEX: <br/>
              <input className="input-HEX" type="text" value={this.state.HEX} name="hex" onChange={this.onChange}/>
            </label>
          </form>
          <div className="App-color" style={{backgroundColor: 'rgb('+ rgba.R +
            ',' + rgba.G + ',' + rgba.B + ')', opacity: rgba.A/100}}>
            <p className="App-donger">{dongerList}</p>
          </div>
        </div>
      )
  }
  render() {
    return (
      <div className="App">
        <div className="App-main">
          {this.renderObjects()}
        </div>
      </div>
    );
  }
}

export default App;
