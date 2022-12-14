const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
}

const getTotalPrice = (arr) => {
    return arr.reduce((sum, obj) => sum + obj.price, 0)
}

const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split('.')
    return keys.reduce((val, key) => {
        return val[key]
    }, obj[firstKey])
}

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path)
        return sum + value
    }, 0)
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SUSHI_CART':
            const currentSushiItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload]

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentSushiItems,
                    totalPrice: getTotalPrice(currentSushiItems)
                }
            }
            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }

        case 'PLUS_CART_ITEM': {
            const newObjItems = [...state.items[action.payload].items, state.items[action.payload].items[0]]
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems)
                }
            }

            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')
            return {
                ...state,
                items: newItems,
                totalPrice,
                totalCount
            }
        }

        case 'MINUS_CART_ITEM': {
            const oldItems = state.items[action.payload].items
            const newObjItems = oldItems.length > 1 ? oldItems.slice(1) : oldItems
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems)
                }
            }


            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')
            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }
        case 'CLEAR_CART':
            return {
                items: {},
                totalPrice: 0,
                totalCount: 0
            }
        case 'REMOVE_CART_ITEM':
            const itemsAfterRemove = {
                ...state.items
            }
            const currentTotalPrice = itemsAfterRemove[action.payload].totalPrice
            const currentTotalCount = itemsAfterRemove[action.payload].items.length
            delete itemsAfterRemove[action.payload]
            return {
                ...state,
                items: itemsAfterRemove,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            }

        default:
            return state
    }

}

export default cart