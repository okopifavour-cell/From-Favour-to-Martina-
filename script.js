// Slideshow timing: total 45s, 3 images => 15s per image. Fade transitions handled by CSS.
const imgs = Array.from(document.querySelectorAll('#slideshow img'));
let current = 0;
const displayTime = 15000; // 15s
imgs[current].classList.add('active');
setInterval(() => {
  imgs[current].classList.remove('active');
  current = (current + 1) % imgs.length;
  imgs[current].classList.add('active');
}, displayTime);

// Simple subtle instrumental using WebAudio API (lightweight, royalty-free, generated in-browser)
// Low volume by default. User can increase via variable.
const audioEnabled = true;
const masterVolume = 0.08; // LOW AND SUBTLE (0.0 - 1.0)

if (audioEnabled && typeof AudioContext !== 'undefined') {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain(); master.gain.value = masterVolume; master.connect(ctx.destination);

  // Gentle bass pad - two oscillators detuned
  const bass1 = ctx.createOscillator();
  const bass2 = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bassGain.gain.value = 0.06;
  bass1.type = 'sine'; bass2.type = 'sine';
  bass1.frequency.value = 110; // A2-ish
  bass2.frequency.value = 116; // slight detune
  const bassFilter = ctx.createBiquadFilter(); bassFilter.type='lowpass'; bassFilter.frequency.value=800;
  bass1.connect(bassGain); bass2.connect(bassGain); bassGain.connect(bassFilter); bassFilter.connect(master);
  bass1.start(); bass2.start();

  // Plucked melody (simple)
  function pluck(time, freq, dur=0.6) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.value = 0.0001;
    osc.connect(gain); gain.connect(master);
    osc.start(time);
    gain.gain.linearRampToValueAtTime(0.09, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.stop(time + dur + 0.05);
  }

  // Soft percussion via noise burst (hi-hat like)
  function noiseBurst(time, duration=0.05, volume=0.015) {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i=0;i<bufferSize;i++) data[i] = (Math.random()*2-1) * Math.exp(-i/bufferSize*6);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const g = ctx.createGain(); g.gain.value = volume;
    src.connect(g); g.connect(master);
    src.start(time);
  }

  // A simple rhythm / pattern scheduler for ~45 seconds (loop)
  const startTime = ctx.currentTime + 0.3;
  const totalDur = 45;
  const tempo = 90; // bpm - slow
  const beatDur = 60/tempo;
  // melody notes in Hz (simple progression)
  const notes = [220, 196, 246.94, 196]; // A3, G3, B3, G3
  for (let t=0; t<totalDur; t += beatDur) {
    const now = startTime + t;
    // place plucks on every 2 beats
    if (Math.floor(t/beatDur) % 2 === 0) {
      const n = notes[(Math.floor(t/(beatDur*2))) % notes.length];
      pluck(now, n, 0.9);
    }
    // hi-hat on every beat
    noiseBurst(now + 0.02, 0.04, 0.012);
  }

  // stop all oscillators after totalDur + small buffer
  setTimeout(()=>{
    try { bass1.stop(); bass2.stop(); } catch(e) {}
  }, (totalDur+1)*1000);

  // start audio on first user interaction if autoplay blocked
  function resumeAudio() {
    if (ctx.state === 'suspended') ctx.resume();
    window.removeEventListener('click', resumeAudio);
    window.removeEventListener('touchstart', resumeAudio);
  }
  window.addEventListener('click', resumeAudio);
  window.addEventListener('touchstart', resumeAudio);
}
