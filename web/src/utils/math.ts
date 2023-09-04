export const getRandomNoBetweenAndIncluding = (min: number, max: number): number => {
    return Math.floor(Math.random() * ((max-min)+1) + min)
}

export const generateUUID = ():string => {
    const cryptoObj = window.crypto || (window as any).msCrypto; // Check for crypto support
    if (cryptoObj && cryptoObj.getRandomValues) {
      // Generate a UUID using a cryptographically strong random number generator
      const buffer = new Uint16Array(8);
      cryptoObj.getRandomValues(buffer);
      buffer[3] = (buffer[3] & 0x0fff) | 0x4000; // Set the version (4)
      buffer[4] = (buffer[4] & 0x3fff) | 0x8000; // Set the variant (10)
      const segments = [
        buffer[0].toString(16),
        buffer[1].toString(16),
        buffer[2].toString(16),
        buffer[3].toString(16),
        buffer[4].toString(16),
        buffer[5].toString(16),
        buffer[6].toString(16),
        buffer[7].toString(16),
      ];
      return `${segments[0]}${segments[1]}-${segments[2]}-${segments[3]}-${segments[4]}-${segments[5]}${segments[6]}${segments[7]}`;
    } else {
      // Fallback to a less secure method
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }