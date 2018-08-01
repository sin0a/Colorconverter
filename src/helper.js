
// Function for input validation
export function validateInput(event){
  var valid = event.target.value;
  switch (event.target.name) {
    // RGB is between 0 and 255
    case "R":
    case "G":
    case "B":
        // Get the value in question
        if(valid >= 0 && valid < 256){
          return true;
        } else {
          return false;
        }
    case "A":
    case "S":
    case "L":
      // A or opacity is a value between 0 and 100
      if(valid >= 0 && valid < 101){
        return true;
      }else{
          return false
        }
    case "H":
      // H is a value between 0 and 360
      if(valid >= 0 && valid < 361){
        return true;
      } else {
        return false;
      }
    default:
      return true;
  }
}
/* Function for undefined objects
  if a value is undefined its set to zero, you cant
  convert an undefined variable
*/
export function validateObjects(rgba, hsl){
  if (isNaN(rgba.R)){
    rgba.R = 255;
  }
  if (isNaN(rgba.G)){
    rgba.G = 255;
  }
  if (isNaN(rgba.B)){
    rgba.B = 255;
  }
  if (isNaN(rgba.A)){
    rgba.A = 100;
  }
  if (isNaN(hsl.H)){
    hsl.H = 0;
  }
  if (isNaN(hsl.L)){
    hsl.L = 0;
  }
  if (isNaN(hsl.S)){
    hsl.S = 0;
  }
  return [rgba,hsl];
}
// Single method for all events. Identefies the source from input name=""
export function trigger(event, rgba, hsl){
  var trigger;
  var array = [];
  // Single method for all objects defined by inputName
  switch(event.target.name){
    case "R":
      rgba.R = event.target.value;
      trigger = "RGBA";
      break;
    case "G":
      rgba.G = event.target.value;
      trigger = "RGBA";
      break;
    case "B":
      rgba.B = event.target.value;
      trigger = "RGBA";
      break;
    case "A":
      rgba.A = event.target.value;
      trigger = "RGBA";
      break;
    case "H":
      hsl.H = event.target.value;
      trigger = "HSL";
      break;
    case "S":
      hsl.S = event.target.value;
      trigger = "HSL";
      break;
    case "L":
      hsl.L = event.target.value;
      trigger = "HSL";
      break;
    case "hex":
      trigger = "HEX";
      break;
    default:
    return true;
  }
  array = [trigger, rgba, hsl];
  return array;
}
export function generateDongers(){
  var dongerList = ['⊂(▀¯▀⊂)', 'ᕙ(˵ ಠ ਊ ಠ ˵)ᕗ','(ノ͡° ͜ʖ ͡°)ノ','[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]', '╰༼ ❛ ʖ̫ ❛ ༽╯', '( ͡° ͜ʖ ͡°) ', 'ლ(▀̿̿Ĺ̯̿̿▀̿ლ)', '(  ͡°  ͜ʖ  ͡°)', '(งಠ_ಠ)ง', '༼つ ◕_◕ ༽つ', 'ლ(ಥ Д ಥ )ლ'];
  var donger = Math.floor((Math.random() * dongerList.length-1) + 1);
  return dongerList[donger];
}
