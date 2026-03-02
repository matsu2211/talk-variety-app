import React from 'react';

// Parses text like "漢字《かんじ》" into <ruby>漢字<rt>かんじ</rt></ruby> elements
export const parseRuby = (text: string) => {
  if (!text) return null;
  const regex = /([\u4e00-\u9faf\u3005-\u3007]+)《(.+?)》/g;
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Push preceding text
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Push ruby element
    parts.push(
      React.createElement('ruby', { key: match.index },
        match[1],
        React.createElement('rt', null, match[2])
      )
    );
    lastIndex = regex.lastIndex;
  }
  // Push remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return React.createElement(React.Fragment, null, parts);
};

// Strips ruby information "漢字《かんじ》" -> "漢字"
export const stripRuby = (text: string) => {
  if (!text) return "";
  return text.replace(/([\u4e00-\u9faf\u3005-\u3007]+)《.+?》/g, '$1');
};