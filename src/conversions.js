/* toHex and hexToRGB built from:
		https://www.rapidtables.com/convert/color/how-rgb-to-hex.html
 		http://www.javascripter.net/faq/index.htm
 RGB to HEX*/
export function toHex(value) {
	// parseInt the value
	value = parseInt(value,10);
	// check of the value is a legal number
	if (isNaN(value)) return "00";
	value = Math.max(0,Math.min(value,255));
	// simply convert decimal number to hex number
	return value.toString(16);
}
// HEX to RGB
export function hexToRGB(hex, rgba) {
	// simply convert hex to decimal
	rgba.R = parseInt(hex.substring(0,2),16);
	rgba.G = parseInt(hex.substring(2,4),16);
	rgba.B = parseInt(hex.substring(4,6),16);
	// return the RGBA object
	return rgba;
}
/* RGB to HSL built from
http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
https://github.com/Qix-/color-convert/blob/master/conversions.js
*/
export function rgbToHSL(r,g,b, hsl) {
	// Convert the values to the range 0-1
	r = r / 255;
	g = g / 255;
	b = b / 255;
	// Find the minimum and maximum values
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	// calculate delta
	var delta = max - min;
	// if min and max are the same, there is no saturdation
	if (max === min) {
		hsl.H = 0;
		// If Red is max, then Hue = (G-B)/delta
	} else if (r === max) {
		hsl.H = (g - b) / delta;
		// If Green is max, then Hue = 2.0 + (B-R)/(max-min)
	} else if (g === max) {
		hsl.H = 2 + (b - r) / delta;
		// If Blue is max, then Hue = 4.0 + (R-G)/(max-min)
	} else if (b === max) {
		hsl.H = 4 + (r - g) / delta;
	}
	// Convert to degrees
	hsl.H = Math.min(hsl.H * 60, 360);
	// If Hue becomes negative add 360 because a circle has 360 degrees.
	if (hsl.H < 0) {
		hsl.H += 360;
	}
	// lightness
	hsl.L = (min + max) / 2;
	// If min and max has the same value, there is no saturdation
	if (max === min) {
		hsl.S = 0;
		// If saturdation is smaller or equal to 0.5. S = (max-min) / (max+min)
	} else if (hsl.L <= 0.5) {
		hsl.S = delta / (max + min);
		// If saturdation is larger than 0.5 S = (max-min) / (2-max-min)
	} else {
		hsl.S = delta / (2 - max - min);
	}
	//round numbers for display. saturdation and Light are values between 0-1
	// multiply by 100 to get the correct percentage
	hsl.H = Math.round(hsl.H);
	hsl.S = Math.round(hsl.S*100);
	hsl.L = Math.round(hsl.L*100);
	// return the HSL object
	return hsl;
}

/* HSL to RGB built from
	http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
	http://web.archive.org/web/20081227003853/http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
	*/
export function hslToRGB(h, s, l, rgba){
	var r, g, b;
	// Since the app displays in percentages and degrees, divide
	h = h/360;
	s = s/100;
	l = l/100;
	// if there is no saturdation, its a shade of grey. The three values will be identical
	if(s === 0){
		r = g = b = l;
	}else{

		var hue2rgb = function hue2rgb(p, q, t){
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}
		// if light is smaller than 0.5
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}
	rgba.R = Math.round(r*255);
	rgba.G = Math.round(g*255);
	rgba.B = Math.round(b*255);
	// return the RGBA object
	return rgba;
}
// Remove a character from a variable
export function sliceSign(value){
	if(value === null){
		return null;
 	} else{
		value.toString().substring(0,value.length-1)
		return value;
	}
 }
// Check if the input has a sign
export function checkSign(value){
 if(value === null){
	 return false;
 }else{
 	for(var i = 0; i > value.toString().length; i++){
	 if(i === "%" || i ==="#" || i==="°"){
		 return true;
	 }else {
		 return false;
	 }
 	}
 }
}
