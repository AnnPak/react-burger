import React from 'react';
import PropTypes from 'prop-types';

const LinkItem = ({props}) => {
    return(
        <a className={props.class} href="/">
            {props.children}
        </a>  
    )
}

LinkItem.propTypes = {
    class: PropTypes.string,
    children: PropTypes.node
};


export default LinkItem;