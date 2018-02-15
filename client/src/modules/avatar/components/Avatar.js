import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AvatarBit from './AvatarBit';
import './avatar.css';

class Avatar extends Component {
  createBits = (n, pattern, cw = 20, ch = 20) => {
    const bitElements = [];
    let l = 0;
    let t = 0;
    let p = 1;
    let inlineStyles;

		for (let i = 0; i < n * n; i += 1) {
      p = pattern.charAt(i);
      inlineStyles = {
        width: `${cw}px`,
        height: `${ch}px`,
        left: `${l}px`,
        top: `${t}px`,
      };
      bitElements.push(<AvatarBit key={i} on={parseInt(p, 0)} style={inlineStyles} />);

      if ((i > 0) && ((i + 1) % n === 0)) {
				l += cw;
				t = 0;
			} else {
				t += ch;
			}
    }
    return bitElements;
  }

  render() {
    let bitItems = 'No bits defined because there is no pattern!';
    if (this.props.size != null && this.props.pattern != null) {
      bitItems = this.createBits(this.props.size, this.props.pattern);
    }
    const height = 20 * this.props.size;
    return (
      <div className="avatar" style={{ height: `${height}px` }}>
        {bitItems}
      </div>
    );
  }
}

Avatar.propTypes = {
  pattern: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default Avatar;
