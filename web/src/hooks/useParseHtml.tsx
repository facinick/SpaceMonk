import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import ReactHtmlParser from 'react-html-parser';

function wrapPreElements(elements: React.ReactElement<any, string | React.JSXElementConstructor<any>>[]) {
  return elements.map((element, index: number) => {
    if (element.type === 'pre') {
      const preProps = {
        ...element.props,
      };
      const preElement = React.createElement('pre', preProps, element.props.children);
      return <div key={index} className="mockup-code bg-secondary text-secondary-content mt-3 mb-3">{preElement}</div>;
    } else if (element.props && element.props.children) {
      const wrappedChildren = wrapPreElements(element.props.children);
      return React.cloneElement(element, { key: index }, wrappedChildren);
    } else {
      return element;
    }
  });
}

function wrapInlineCodeElements(elements: React.ReactElement<any, string | React.JSXElementConstructor<any>>[]) {
  return elements.map((element, index: number) => {
    if (element.type === 'code') {
      const preProps = {
        ...element.props,
        className: 'kbd kbd-sm',
      };
      const codeElement = React.createElement('code', preProps, element.props.children);
      return codeElement
    } else if (element.props && element.props.children && element.type !== 'pre') {
      const wrappedChildren = wrapInlineCodeElements(element.props.children);
      return React.cloneElement(element, { key: index }, wrappedChildren);
    } else {
      return element;
    }
  });
}

export function useCleanHtml(html: string): string {
  const sanitizedHtml = useMemo(() => {
    return DOMPurify.sanitize(html);
  }, [html]);

  return sanitizedHtml;
}

export function useParseHtml(html: string): React.ReactElement<any, string | React.JSXElementConstructor<any>>[] {
  const sanitizedHtml = useCleanHtml(html)

  const parsedHtml = useMemo(() => {
    const parsed = ReactHtmlParser(sanitizedHtml);
    return wrapPreElements(wrapInlineCodeElements(parsed))
  }, [sanitizedHtml]);

  return parsedHtml;
}
