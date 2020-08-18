const fs = require('fs')
const midiConverter = require('midi-converter')
const Handlebars = require('handlebars')

const compiledTemplate = fs.readFileSync('src/midi.hbs', {encoding: 'utf-8'})
const template = Handlebars.compile(compiledTemplate)


const midiSong = fs.readFileSync('src/example_midi_files/hot_butter-popcorn.mid', 'binary')
const jsonSong = midiConverter.midiToJson(midiSong)
const track = jsonSong.tracks[1]

// fs.writeFileSync('example.json', JSON.stringify(jsonSong));

const toneArray = [1, 1, 0.7, 0.7, 0.65, 0.65, 0.6, 0.6, 0.55, 0.5, 0.5, 0.45, 0.45]
const octaafArray = [1, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45]
const durationArray = [1, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3]

const parsedSong = []

for (let i = 0; i < track.length; i++) {
  const element = track[i]
  const nextElement = track[i + 1]
  if (element.type === 'channel' && element.subtype === 'noteOn') {
    const deltatimeOn = element.deltaTime
    const deltatimeOff = nextElement.deltaTime
    const duration = Math.round(((deltatimeOff - deltatimeOn) / 0.002) / 15000)
    const noteNumber = element.noteNumber

    const octaaf = Math.ceil((noteNumber - 23) / 12)
    const tone = (noteNumber - 9) % 12

    if (duration > 0) {
      parsedSong.push({
        duration: durationArray[duration],
        octaaf: octaafArray[octaaf],
        tone: toneArray[tone],
        original: {
          duration: duration * 15000,
          octaaf: octaaf,
          tone: tone
        }
      })
    }
  }
}

const context = {
  title: 'Views Example',
  midiJSON: parsedSong
}

fs.writeFileSync('output/hot_butter-popcorn.html', template(context));
