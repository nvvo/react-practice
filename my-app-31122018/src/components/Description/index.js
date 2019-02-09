import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

function Description(props) {
  console.log(props.children);
  return <p className="Description">{props.children}</p>;
}

Description.propTypes = {
  children: PropTypes.node,
};

export default Description;