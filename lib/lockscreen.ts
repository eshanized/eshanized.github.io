export const shouldSkipLockscreen = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('skipLockscreen') === 'true';
};

export const setSkipLockscreen = (value: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('skipLockscreen', String(value));
};

export const toggleSkipLockscreen = (): boolean => {
  if (typeof window === 'undefined') return false;
  const newValue = !shouldSkipLockscreen();
  setSkipLockscreen(newValue);
  return newValue;
}; 