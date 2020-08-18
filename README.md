# MidiConverter-4-ArduinoMusicBox

A Midi converter that generates a printable paper musicroll, that could be played by an Arduino music box robot reading the gray values with a couple of IR sensors.

This converter was a part of a bigger project of the arduino jam held at the timelab in March 2015.

The output html was printed on a multiple papers taped after each other, and a zumo robot would line follow the printed table and read the gray values which exists of 3 parts:

- duration
- octave
- tone

Although the final robot did manage to follow the line and read the code. Due to harsh light conditions the final result sounded a bit more chaotic then intended.
This methode only works with monophonic midi files.

[Watch the end result](https://www.youtube.com/watch?v=LKSbp0qiUHo)

## Credits

I only created this script to convert the midifiles. All research and development on the robot where done by: Stephan, Chris and Tom Putzeys.

## TODO

- [ ] easy run script and add parameter of midi file
- [ ] recreate a Arduino player for it

## Developement

### Start

```javascript
  npm i
  npm start
```
