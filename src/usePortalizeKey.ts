import {useCallback, useRef} from 'react';

// Generates a random key
function keyGenerator(): string {
  return `rnp_${Math.random().toString(36).substring(2, 18)}-${Math.random()
    .toString(36)
    .substring(2, 18)}-${Math.random().toString(36).substring(2, 18)}`;
}

// Custom hook that checks for uniqueness and retries if clashes
export default function usePortalizeKey(): {
  generateKey: () => string;
  removeKey: (key: string) => void;
} {
  const usedKeys = useRef<string[]>([]);

  const generateKey = useCallback(() => {
    let foundUniqueKey = false;
    let newKey = '';
    let tries = 0;

    while (!foundUniqueKey && tries < 3) {
      // limit number of tries to stop endless loop of pain
      tries += 1;
      newKey = keyGenerator();
      if (usedKeys.current.indexOf(newKey) < 0) {
        foundUniqueKey = true;
      }
    }

    // will only run if exited while loop without finding a unique key
    if (!foundUniqueKey) {
      newKey = `rnp_${Date.now()}_${Math.floor(Math.random() * 1000)}`; // fallback method
    }

    usedKeys.current.push(newKey);
    return newKey;
  }, []);

  // Removes our key to make it 'available' again
  const removeKey = useCallback((key: string) => {
    usedKeys.current = usedKeys.current.filter(k => k !== key);
  }, []);

  return {generateKey, removeKey};
}
