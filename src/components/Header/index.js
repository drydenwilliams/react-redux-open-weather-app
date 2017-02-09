import React, { PropTypes } from 'react'

function Header({ text }) {
  return (
    <header>
      {text}
    </header>
  )
}

Header.propTypes = {
  text: PropTypes.string.isRequired
}

export default Header;