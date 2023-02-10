export function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export function truncate(text: string, length: number): string {
  if(text.length <= length) {
    return text
  }

  return text.substring(0, length) + '...'
}
