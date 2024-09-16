const startButton = document.getElementById('startAudio')
startButton.addEventListener('click', () => {

  console.log("ON")
  // Use the audio context as needed
})
const audioContext = new AudioContext()

const NOTE_DETAILS =[
    { note: "C", key: "Z",frequency: 261.626,active: false},
    { note: "A", key: "X",frequency: 277.183,active: false},
    { note: "B", key: "C",frequency: 293.665,active: false},
    { note: "N", key: "V",frequency: 311.127,active: false},
    { note: "G", key: "B",frequency: 329.680,active: false},
    { note: "K", key: "N",frequency: 256.678,active: false},
    { note: "Lb", key: "M",frequency: 300.456,active: false},
    { note: "D", key: "A",frequency: 345.765,active: false},
    { note: "Kb", key: "S",frequency: 456.456,active: false},
    { note: "I", key: "D",frequency: 458.324,active: false},
    { note: "L", key: "F",frequency: 290.589,active: false},
    { note: "Nb", key: "G",frequency: 302.546,active: false}

]

document.addEventListener("keydown", e => {
    if (e.repeat) return
    const keyboardKey = e.code
    const noteDetail = getNoteDetail(keyboardKey)
  
    if (noteDetail == null) return
  
    noteDetail.active = true
    playNotes()
  })
  
  document.addEventListener("keyup", e => {
    const keyboardKey = e.code
    const noteDetail = getNoteDetail(keyboardKey)
  
    if (noteDetail == null) return
  
    noteDetail.active = false
    playNotes()
  })
  
  function getNoteDetail(keyboardKey) {
    return NOTE_DETAILS.find(n => `Key${n.key}` === keyboardKey)
  }
  
  function playNotes() {
    NOTE_DETAILS.forEach(n => {
      const keyElement = document.querySelector(`[data-note="${n.note}"]`)
      keyElement.classList.toggle("active", n.active)
      if (n.oscillator != null) {
        n.oscillator.stop()
        n.oscillator.disconnect()
      }
    })
  
    const activeNotes = NOTE_DETAILS.filter(n => n.active)
    const gain = 1 / activeNotes.length
    activeNotes.forEach(n => {
      startNote(n, gain)
    })
  }
  
  function startNote(noteDetail, gain) {
    const gainNode = audioContext.createGain()
    gainNode.gain.value = gain
    const oscillator = audioContext.createOscillator()
    oscillator.frequency.value = noteDetail.frequency
    oscillator.type = "sine"
    oscillator.connect(gainNode).connect(audioContext.destination)
    oscillator.start()
    noteDetail.oscillator = oscillator
  }
  