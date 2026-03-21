export const speak = (text, lang = 'en') => {
    if (!window.speechSynthesis) {
        console.error("Speech Synthesis not supported in this browser.");
        return;
    }
    // Purani voice ko stop karo pehle
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Language mapping
    if (lang === 'hi') utterance.lang = 'hi-IN';
    else if (lang === 'pa') utterance.lang = 'pa-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = 0.9; // Thoda dheere taaki samajh aaye
    window.speechSynthesis.speak(utterance);
};