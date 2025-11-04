// lib/loadGoogleTranslate.ts
export const loadGoogleTranslate = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (!document.querySelector('#google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  }

  (window as any).googleTranslateElementInit = () => {
    if (!(window as any).google?.translate?.TranslateElement) return;
    new (window as any).google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,hi,as',
        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      'google_translate_element'
    );
  };
};
