window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;
let p = document.createElement('p');
const words = document.querySelector('.words');

words.appendChild(p);

let finalTranscriptSoFar = '';

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
    .filter(result => result.isFinal)
    .map(result => result[0].transcript)
    .join('');

    const newFinalTranscript = transcript.substring(finalTranscriptSoFar.length);

    const interimTranscript = Array.from(e.results)
        .filter(result => !result.isFinal)
        .map(result => result[0].transcript)
        .join('');

    p.textContent = newFinalTranscript + interimTranscript;
    if(e.results[e.results.length - 1].isFinal){
        finalTranscriptSoFar = transcript; 
        p = document.createElement('p');
        words.appendChild(p);
    }
    //else{
    //     p.textContent = transcript;
    // }
})

recognition.addEventListener('end', recognition.start);

recognition.start();