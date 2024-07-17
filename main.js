/*// This is a JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const result = document.getElementById('result');
    var hyouzi= '';

    // 音声認識APIの使用
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'ja-JP'; // 日本語設定
    recognition.interimResults = false; // 中間結果を返さない
    
    // 音声認識開始時の処理
    startButton.addEventListener('click', () => {
        recognition.start();
        result.textContent = 'Listening...';
    });

    // 音声認識成功時の処理
    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        
        result.textContent = `${transcript}` ;
        hyouzi = result.textContent;
    });

    // 音声認識エラー時の処理
    recognition.addEventListener('error', (event) => {
        result.textContent = `Error occurred in recognition: ${event.error}`;
    });

    // 音声認識終了時の処理
});
*/
// This is a JavaScript file
// This is a JavaScript file
document.addEventListener('DOMContentLoaded', async function() { // asyncを追加
    const startButton = document.getElementById('startButton');
    const result = document.getElementById('result');
    
    // 音声認識APIの使用
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'ja-JP'; // 日本語設定
    recognition.interimResults = false; // 中間結果を返さない

    let recognizing = false;

    // 音声認識開始時の処理
    startButton.addEventListener('click', () => {
        if (recognizing) {
            recognition.stop();
            result.textContent = 'Recognition stopped.';
            recognizing = false;
            startButton.textContent = 'Start';
        } else {
            recognition.start();
            result.textContent = 'Listening...';
            recognizing = true;
            startButton.textContent = 'Stop';
        }
    });

    await checkVolume(); // 音量判定を待機

    // 音声認識成功時の処理
    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        result.textContent = `${transcript}`;
        send_voice();
    });

    // 音声認識エラー時の処理
    recognition.addEventListener('error', (event) => {
        result.textContent = `Error occurred in recognition: ${event.error}`;
        recognizing = false;
        startButton.textContent = 'Start';
    });

    // 音声認識終了時の処理
    recognition.addEventListener('end', () => {
        if (recognizing) {
            recognition.start(); // 再度認識を開始
        }
    });
});
