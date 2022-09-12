import React, {useCallback, useEffect} from 'react';
import {Categories, SushiBlock, SushiLoadingBlock, SortPopup} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../redux/actions/filters";
import {fetchSushi} from "../redux/actions/sushi";
import {addSushiToCart} from "../redux/actions/cart";

const categoryNames = ['Sashimi', 'Nigiri', 'Maki']
const sortItems = [
    {name: 'popular', type: 'popular', order: 'desc'},
    {name: 'price', type: 'price', order: 'desc'},
    {name: 'alphabet', type: 'name', order: 'asc'}
]

function Home() {
    const dispatch = useDispatch()
    const items = useSelector(({sushi}) => sushi.items)
    const isLoaded = useSelector(({sushi}) => sushi.isLoaded)
    const {category, sortBy} = useSelector(({filters}) => filters)
    const cartItems = useSelector(({cart}) => cart.items)

    const onSelectCategory = useCallback(index => {
        dispatch(setCategory(index))
    }, [])

    const onSelectSortType = useCallback(obj => {
        dispatch(setSortBy(obj))
    }, [])

    const handleaddSushiToCart = (obj) => {
        dispatch(addSushiToCart(obj))
    }


    useEffect(() => {
        dispatch(fetchSushi(category, sortBy))
    }, [category, sortBy])

    return (
        <div className="container">
            <div className="content__top">
                <Categories items={categoryNames}
                            onClickCategory={onSelectCategory}
                            activeCategory={category}
                />
                <SortPopup activeSortType={sortBy.type}
                           items={sortItems}
                           onClickSortType={onSelectSortType}
                />
            </div>
            <h2 className="content__title">All sushi rolls</h2>
            <div className="content__items">

                {isLoaded
                    ? items.map((sushi) => (
                        <SushiBlock
                            onClickAddSushi={handleaddSushiToCart}
                            key={sushi.id}
                            addedCount={cartItems[sushi.id] && cartItems[sushi.id].items.length}
                            {...sushi}/>))
                    :
                    Array(12).fill(0).map((_, index) => <SushiLoadingBlock key={index}/>)
                }


            </div>
        </div>
    );

}

export default Home;