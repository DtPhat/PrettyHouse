export function convertSlugToTitle(inputString) {
  let words = inputString.split('-');
  let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  let titleCaseString = capitalizedWords.join(' ');
  return titleCaseString;
}

export function convertTitleToSlug(inputString) {
  let words = inputString.toLowerCase().split(' ');
  let hyphenatedString = words.join('-');
  return hyphenatedString;
}

export function capTextWithEllipsis(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength - 3) + '...';
  }
}