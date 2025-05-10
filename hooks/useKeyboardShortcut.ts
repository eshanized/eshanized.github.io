import { useEffect, useRef } from 'react';

export type KeyboardShortcut = {
  key: string;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  preventDefault?: boolean;
  callback: () => void;
};

/**
 * A hook for handling keyboard shortcuts globally
 * @param shortcuts Array of keyboard shortcuts to handle
 */
export const useKeyboardShortcut = (shortcuts: KeyboardShortcut[]) => {
  const shortcutsRef = useRef(shortcuts);

  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, metaKey, altKey, shiftKey, ctrlKey } = event;
      
      shortcutsRef.current.forEach((shortcut) => {
        const keyMatch = shortcut.key.toLowerCase() === key.toLowerCase();
        const metaMatch = !!shortcut.metaKey === metaKey;
        const altMatch = !!shortcut.altKey === altKey;
        const shiftMatch = !!shortcut.shiftKey === shiftKey;
        const ctrlMatch = !!shortcut.ctrlKey === ctrlKey;

        if (keyMatch && metaMatch && altMatch && shiftMatch && ctrlMatch) {
          if (shortcut.preventDefault) {
            event.preventDefault();
          }
          shortcut.callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};

/**
 * Parse a keyboard shortcut string like "⌘A" or "⇧⌘Z" into a KeyboardShortcut object
 * @param shortcutString The keyboard shortcut string to parse
 * @param callback The function to call when the shortcut is triggered
 */
export const parseShortcutString = (
  shortcutString: string,
  callback: () => void
): KeyboardShortcut | null => {
  if (!shortcutString) return null;
  
  const parts = shortcutString.split('');
  let metaKey = false;
  let altKey = false;
  let shiftKey = false;
  let ctrlKey = false;
  let key = '';

  // Process each character in the shortcut
  for (let i = 0; i < parts.length; i++) {
    const char = parts[i];
    switch (char) {
      case '⌘': // Command key
        metaKey = true;
        break;
      case '⌥': // Option/Alt key
        altKey = true;
        break;
      case '⇧': // Shift key
        shiftKey = true;
        break;
      case '⌃': // Control key
        ctrlKey = true;
        break;
      default:
        // The last character is assumed to be the actual key
        if (i === parts.length - 1) {
          key = char;
        }
    }
  }

  if (!key) return null;

  return {
    key,
    metaKey,
    altKey,
    shiftKey,
    ctrlKey,
    preventDefault: true,
    callback,
  };
}; 