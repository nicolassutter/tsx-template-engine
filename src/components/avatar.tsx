import PropTypes from 'prop-types'
import { getProps } from '~/utils'

const { defaultProps, types } = getProps(() => ({
  src: {
    type: PropTypes.string.isRequired,
    default: ''
  },

  alt: {
    type: PropTypes.string,
    default: ''
  }
}))

const Button = ({ src, alt }: typeof types) => {
  return (
    <figure className='avatar'>
      <img src={src} alt={alt} />
    </figure>
  )
}

Button.defaultProps = defaultProps
Button.propTypes = types
export default Button