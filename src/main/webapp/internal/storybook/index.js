import { storiesOf as of } from '@connexta/ace/@storybook/react'

import withTheme from './withTheme'

export const storiesOf = (name, m) => {
  const stories = of(name, m)
  stories.addDecorator(withTheme)
  return stories
}

export { action } from '@connexta/ace/@storybook/addon-actions'
export {
  array,
  text,
  number,
  boolean,
  select,
} from '@connexta/ace/@storybook/addon-knobs'
