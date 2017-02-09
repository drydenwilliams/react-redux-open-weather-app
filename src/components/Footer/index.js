import React, { PropTypes } from 'react'

function Footer({ text }) {
  return (
    <footer>
      {text}
    </footer>
  )
}

Footer.propTypes = {
  text: PropTypes.string.isRequired
}

export default Footer;