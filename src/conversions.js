// toHex and hexToRGB http://www.javascripter.net/faq/index.htm
// RGB to HEX
export function toHex(value) {
	value = sliceSign(value);
	value = parseInt(value,10);
	if (isNaN(value)) return "00";
	value = Math.max(0,Math.min(value,255));
	return value.toString(16);
}
// HEX to RGB
export function hexToRGB(hex, rgba) {
	// ez pz
	rgba.R = parseInt(hex.substring(0,2),16);
	rgba.G = parseInt(hex.substring(2,4),16);
	rgba.B = parseInt(hex.substring(4,6),16);
	// return the RGBA object
	return rgba;
}
// Remove a character from value
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
			console.log(value.toString());
		 if(i === "%" || i ==="#" || i==="°"){
			 console.log(true);
			 return true;
		 }else {
			 return false;
		 }
	 	}
	 }
 }
// HSL to RGB http://web.archive.org/web/20081227003853/http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
export function hslToRGB(h, s, l, rgba){
	var r, g, b;
	// Since the app displays in percentages, divide
	h = h/360;
	s = s/100;
	l = l/100;
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
// RGB to HSL https://github.com/Qix-/color-convert/blob/master/conversions.js
export function rgbToHSL(r,g,b, hsl) {
	r = r / 255;
	g = g / 255;
	b = b / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;

	if (max === min) {
		hsl.H = 0;
	} else if (r === max) {
		hsl.H = (g - b) / delta;
	} else if (g === max) {
		hsl.H = 2 + (b - r) / delta;
	} else if (b === max) {
		hsl.H = 4 + (r - g) / delta;
	}
	hsl.H = Math.min(hsl.H * 60, 360);
	if (hsl.H < 0) {
		hsl.H += 360;
	}
	hsl.L = (min + max) / 2;
	if (max === min) {
		hsl.S = 0;
	} else if (hsl.L <= 0.5) {
		hsl.S = delta / (max + min);
	} else {
		hsl.S = delta / (2 - max - min);
	}
	hsl.H = Math.round(hsl.H);
	hsl.S = Math.round(hsl.S*100);
	hsl.L = Math.round(hsl.L*100);
	// return the HSL object
	return hsl;
};
