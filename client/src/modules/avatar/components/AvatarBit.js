import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './avatar.css';

class AvatarBit extends Component {
  /*generateAvatarBits(n, cw, ch, pattern) {
    const domStr = '', l = 0, t = 0, p = 1;

		for(var i = 0;i < n * n;i++) {
			tempStr += '<div class="bit';
			p = pattern.charAt(i);
			if(p == 1) {
				tempStr += ' bit--active';
			}			
			tempStr += '"';
			tempStr += ' style="';
			tempStr += 'width:' + cw + 'px;';
			tempStr += 'height:' + ch + 'px;';
			tempStr += 'left:' + l + 'px;';
			tempStr += 'top:' + t + 'px;';
			tempStr += '">';
			tempStr += '</div>';	
			
			if((i > 0) && ((i + 1) % n == 0)) {
				l += cw;
				t = 0;
			} else {
				t += ch;
			}
			
		}	
		container.innerHTML = tempStr;
	}*/

  render() {
    const classActive = (this.props.on === 1) ? 'avatar__bit--active' : '';
    const classes = classNames('avatar__bit', classActive);
    
    return (
      <div className={classes} style={this.props.style}>
      </div>
    );
  }
}

AvatarBit.propTypes = {
  on: PropTypes.number.isRequired,
};

export default AvatarBit;
