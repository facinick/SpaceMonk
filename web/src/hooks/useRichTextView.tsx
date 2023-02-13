import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import ReactHtmlParser from 'react-html-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function useSyntaxHighlight(html: string) {
  const sanitizedHtml = useMemo(() => {
    return DOMPurify.sanitize(html);
  }, [html]);

  const parsedHtml = useMemo(() => {
    return ReactHtmlParser(sanitizedHtml, {
      transform: (node, index) => {
        if (node.type === 'tag' && node.name === 'pre' && node.children.length === 1 && node.children[0].type === 'text') {
          const code = node.children[0].data.trim();
          const language = node.attribs['data-language'] || 'auto';
          return (
            <SyntaxHighlighter
              key={index}
              language={language}
              style={nord}
              showLineNumbers={true}
              wrapLines={true}
            >
              {code}
            </SyntaxHighlighter>
          );
        }
      }
    });
  }, [sanitizedHtml]);

  return parsedHtml;
}
