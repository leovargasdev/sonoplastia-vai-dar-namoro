let sounds = []

let soundsCache = new Map()

function onSound(soundIndex) {
  const soundPath = sounds[soundIndex].path

  let sound = soundsCache.get(soundIndex)

  if(!sound) {
    sound = new Audio(soundPath)
    soundsCache.set(soundIndex, sound)
  }

  sound.currentTime = 0
  sound.play()
}

document.addEventListener('keydown', ({ key }) => {
  const soundIndex = sounds.findIndex(sound => sound.hotkey === key)

  if(soundIndex === -1) {
    return
  }
  
  onSound(soundIndex)
})


fetch('../sounds.json').then(response => response.json()).then(data => {
  sounds = data

  const elementSounds = document.querySelector('.sounds')

  sounds.map((sound, index) => {
    const li = document.createElement('li')

    const button = document.createElement('button')
    button.setAttribute('onclick', `onSound(${index})`)

    const span = document.createElement('span')
    span.innerHTML = sound.hotkey
    button.appendChild(span)

    const label = document.createElement('label')
    label.innerHTML = sound.label
    button.appendChild(label)


    li.appendChild(button)

    elementSounds.appendChild(li)
  })
})