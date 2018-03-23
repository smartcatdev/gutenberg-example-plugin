import PropTypes from 'prop-types'

const Content = ({ children, textColor: color }) => <div style={{ color }}>{children}</div>

Content.propTypes = {
  textColor: PropTypes.string
}

export default Content