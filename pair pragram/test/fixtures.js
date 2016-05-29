function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            category:'食品',
            subCategory:'碳酸饮料',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            category:'食品',
            subCategory:'碳酸饮料',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            category:'食品',
            subCategory:'水果',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            category:'食品',
            subCategory:'水果',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '洗洁精',
            unit: '瓶',
            category:'家用',
            subCategory:'厨房用品',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            category:'食品',
            subCategory:'速食食品',
            price: 4.50
        }
    ];
}

function loadPromotions() {
    return [
        {
            type: 'BUY_TEN_GET_ZERO_POINT_NINE_FIVE',
            subCategory:'碳酸饮料'
        }
    ];
}
