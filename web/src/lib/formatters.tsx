import React from 'react'

import humanize from 'humanize-string'

const MAX_STRING_LENGTH = 200

export const formatEnum = (values: string | string[] | null | undefined) => {
  let output = ''

  if (Array.isArray(values)) {
    const humanizedValues = values.map((value) => humanize(value))
    output = humanizedValues.join(', ')
  } else if (typeof values === 'string') {
    output = humanize(values)
  }

  return output
}

export const jsonDisplay = (obj: unknown) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

export const truncate = (value: string | number, by = MAX_STRING_LENGTH): [string, boolean] => {
  let output = value?.toString() ?? ''

  let truncated = false

  if (output.length > by) {
    output = output.substring(0, by)
    truncated = true
  }

  return [output, truncated]
}

export function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2))
}

export const timeTag = (dateTime?: string) => {
  let output: string | JSX.Element = ''

  if (dateTime) {
    output = (
      <time dateTime={dateTime} title={dateTime}>
        {new Date(dateTime).toUTCString()}
      </time>
    )
  }

  return output
}

export const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}
