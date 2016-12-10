# gcode2svg
Simple CNC g-codes to SVG convertor. It takes gcode string and converts it into a __2D__ SVG.

This is a part of my [Arduino WIFI drawing bot][2] project.
List of all GCodes is here: [http://reprap.org/wiki/G-code][1]

##Note
For now this is not in-browser module. It can run only in NodeJs. But it can be easily modified to support at least modern versions of most popular browsers.

##Usage
```javascript
var gcode2svg = require('gcode2svg');
gcode2svg('G0 X1 Y1\nG1 X100 Y100');
```

##Installation
```
npm install --save gcode2svg
```

##Supported GCodes
* _G0_ - fast move
* _G1_ - draw straight line
* _G2_ - draw arc clockwise
* _G3_ - draw arc counterclockwise
* _G20_ - set units to inches
* _G21_ - set units to mm
* _G90_ - set absolute coordinates
* _G91_ - set relative coordinates

##Plans
* Support following GCodes:
  * _M2_ - programm end
  * _M600_ - filament change pause to change color
  * _T#_ - change tool to change colors
* Support multiple tools with different options to swith betweent them and draw in multiple colors.

##Links
* [RepRap.org][3]

##Contribution
Any help is welcome. Especialy with my [drawbot][2] project

#License
MIT

[1]: http://reprap.org/wiki/G-code
[2]: https://github.com/alex18881/ArduinoWifiDrawbot
[3]: http://reprap.org
