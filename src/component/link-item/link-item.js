import React from "react";
import PropTypes from "prop-types";

const LinkItem = ({className, to, ...props}) => {
    return (
        <a className={className} href={to}>
            {props.children}
        </a>
    );
};

LinkItem.propTypes = {
    class: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default LinkItem;
