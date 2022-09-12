import React, {useState} from 'react';
import PropTypes from 'prop-types'
import classNames from "classnames";
import Button from "../Button";

function SushiBlock({id, name, imageUrl, price, types, onClickAddSushi, addedCount}) {
    const availableTypes = ['standard', 'vegan']

    const [activeType, setActiveType] = useState(types[0])

    const onSelectType = (index) => {
        setActiveType(index)
    }

    const onAddSushi = () => {
        const obj = {
            id,
            name,
            imageUrl,
            price,
            type: availableTypes[activeType]
        }
        onClickAddSushi(obj)
    }


    return (
        <div className='sushi-block--wrapper'>
            <div className="sushi-block">
                <div className='sushi-block__img-wrapper'>
                    <img
                        className="sushi-block__image"
                        src={imageUrl}
                        alt="sushi"
                    />
                </div>
                <h4 className="sushi-block__title">{name}</h4>
                <div className="sushi-block__selector">
                    <ul>
                        {availableTypes.map((type, i) => (
                            <li key={type}
                                onClick={() => onSelectType(i)}
                                className={classNames({
                                    'active': activeType === i,
                                    'disabled': !types.includes(i),
                                })}
                            >
                                {type}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="sushi-block__bottom">
                    <div className="sushi-block__price">{price} $</div>
                    <Button onClick={onAddSushi} className='button--add' outline>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Add</span>
                        {addedCount !== undefined && <i>{addedCount}</i>}
                    </Button>
                </div>
            </div>
        </div>
    )
}

SushiBlock.propTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(PropTypes.number).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    onAddSushi: PropTypes.func,
    addedCount: PropTypes.number
}

SushiBlock.defaultProps = {
    name: '---',
    price: 0,
    types: [],
    sizes: [],
}

export default SushiBlock;