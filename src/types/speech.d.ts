export {};

declare global {
  interface SpeechRecognitionEventLike extends Event {
    resultIndex: number;
    results: {
      length: number;
      [index: number]: { 0: { transcript: string }; isFinal: boolean; length: number };
    };
  }

  interface SpeechRecognitionLike extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start: () => void;
    stop: () => void;
    onresult: ((event: SpeechRecognitionEventLike) => void) | null;
    onend: (() => void) | null;
    onerror: ((event: Event) => void) | null;
  }

  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}
