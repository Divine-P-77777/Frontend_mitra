'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslateLoader() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (!document.querySelector('#google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,as',
          layout:
            window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };
  }, []);

  return <div id="google_translate_element" className="hidden" />;
}
