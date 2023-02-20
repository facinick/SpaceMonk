import { RedwoodError } from '@redwoodjs/api'

interface Props {
  code: number
  message: string
  data?: Record<string, unknown>
}

export class GeneralError extends RedwoodError {
  readonly code: number
  readonly data: Record<string, unknown>

  constructor({ code, message, data }: Props) {
    super(message)
    this.data = data
    this.code = code
  }
}
