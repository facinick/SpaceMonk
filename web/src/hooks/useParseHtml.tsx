import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import ReactHtmlParser from 'react-html-parser';

function wrapElements(elements: React.ReactElement<any, string | React.JSXElementConstructor<any>>[]) {
  return elements.map((element, index: number) => {
    if (element.type === 'pre') {
      const preProps = {
        ...element.props,
        style: { ':before': { display: 'none' } }
      };
      const preElement = React.createElement('pre', preProps, element.props.children);
      return <div key={index} className="mockup-code bg-secondary text-secondary-content mt-3 mb-3">{preElement}</div>;
    } else if (element.props && element.props.children) {
      const wrappedChildren = wrapElements(element.props.children);
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
    return wrapElements(parsed)
  }, [sanitizedHtml]);

  return parsedHtml;
}
