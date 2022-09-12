import React from 'react';
import PropTypes from "prop-types";



const  Categories = ({activeCategory, items, onClickCategory}) => {
    return (
        <div className="categories">
            <ul>
                <li className={activeCategory === null ? 'active' : ''} onClick={() => onClickCategory(null)}>All</li>
                {items && items.map((name, i) => (
                     <li className={activeCategory === i ? 'active' : ''} onClick={() => onClickCategory(i)} key={`${name}_${i}`}>{name}</li>
                ))}
            </ul>
        </div>
    );
}


Categories.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickCategory: PropTypes.func
}

Categories.defaultProps = {activeCategory: null, items: []}

export default React.memo(Categories);