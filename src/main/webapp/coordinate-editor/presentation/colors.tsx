import { darken, readableColor } from 'polished'

const Black = (props: any): string =>
  readableColor(props.theme.backgroundContent)

const Silver = (props: any): string => darken(0.2)(White(props))

const Grey = (props: any): string => darken(0.4)(White(props))

const White = (props: any): string => props.theme.backgroundContent

const ButtonColor = (props: any): string => props.theme.primaryColor

const SubmitButtonColor = (props: any): string => props.theme.positiveColor

export { Black, Silver, Grey, White, ButtonColor, SubmitButtonColor }
