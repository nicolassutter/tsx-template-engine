import PropTypes from 'prop-types'
import { getProps, ToPropTypes } from '~/utils'
import classnames from 'classnames'

type MyObject = {
  message: string,
  test?: number,
}

const { defaultProps, types } = getProps(() => ({
  isActive: {
    type: PropTypes.bool,
    default: false
  },
  an_object: {
    type: PropTypes.shape<ToPropTypes<MyObject>>({ message: PropTypes.string.isRequired, test: PropTypes.number }).isRequired,
    default: { message: 'A message' }
  }
}))

const Component = ({ children, isActive, an_object }: typeof types) => {
  const test = 'Hello there!'

  const classes = classnames({
    active: isActive
  })

  return (
    <div className={classes}>
      { test }
      { children }
      { JSON.stringify(an_object) }
    </div>
  )
}

Component.propTypes = types
Component.defaultProps = defaultProps
export default Component