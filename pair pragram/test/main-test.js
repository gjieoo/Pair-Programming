//var textJavascriptByNodejs=require('../main/main.js');

describe('pos', function() {

    var allItems;
    var inputs;

    beforeEach(function() {
        allItems = loadAllItems();
        inputs = [
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000002',
            'ITEM000002',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print correct text', function() {

        spyOn(console, 'log');

        printReceipt(inputs);

        var expectText =
            '***<没钱赚商店>收据***\n' +
            '名称：可口可乐，数量：6瓶，单价：3.00(元)，小计：17.10(元)，优惠：0.90(元)\n'+
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：14.25(元)，优惠：0.75(元)\n'+
            '名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：2袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '批发价出售商品：名称：可口可乐，数量：6瓶名称：雪碧，数量：5瓶\n'+
            '----------------------\n' +
            '总计：81.35(元)，节省：1.65(元)\n' +
            '**********************';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
describe("unit test",function () {
    var allItems;
    var item;
    var promotion;
    beforeEach(function () {

        allItems=loadAllItems();
        promotion=loadPromotions();
        item=[
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2'

        ];
    });
    describe("count itemsCount ",function () {
        it("when itemBarcode not have '-'", function() {
            var itemscount=buildItemsCount(allItems,['ITEM000001']);
            var items=[

                {
                    items: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        category:'食品',
                        subCategory:'碳酸饮料',
                        price: 3.00

                    },
                    count: 1
                }
            ];
            expect(itemscount).toEqual(items);
        });
        it("when itemBarcode have '-'", function() {
            var itemscount=buildItemsCount(allItems,['ITEM000003-2']);
            var items=[

                {
                    items: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        category:'食品',
                        subCategory:'水果',
                        price: 15.00

                    },
                    count: 2
                }
            ];
            expect(itemscount).toEqual(items);
        });
        it("when itemsBarcode not have '-'", function() {
            var itemscount=buildItemsCount(allItems,['ITEM000001','ITEM000001','ITEM000001']);
            var items=[
                {
                    items: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        category:'食品',
                        subCategory:'碳酸饮料',
                        price: 3.00

                    },
                    count:3
                }

            ];
            expect(itemscount).toEqual(items);
        });
        it("count all", function() {
            var itemscount=buildItemsCount(allItems,item);
            var items=[
                {
                    items: {
                        barcode: 'ITEM000000',
                        name: '可口可乐',
                        unit: '瓶',
                        category:'食品',
                        subCategory:'碳酸饮料',
                        price: 3.00

                    },
                    count:6}
                ,
                {
                    items: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        category:'食品',
                        subCategory:'碳酸饮料',
                        price: 3.00

                    },
                    count:5}
                ,
                {
                    items: {
                      barcode: 'ITEM000003',
                      name: '荔枝',
                      unit: '斤',
                      category:'食品',
                      subCategory:'水果',
                      price: 15.00

                    },
                    count:2
                }
            ];
            expect(itemscount).toEqual(items);
        });

    });
    describe("count cartItems",function () {

        it("when item is saleItem and num more than 10",function () {
            var items=buildItemsCount(allItems,item);
            var cartItems=buildCartItems(items,promotion);
            var cartItems=buildCartItems([
                {
                items: {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    category:'食品',
                    subCategory:'碳酸饮料',
                    price: 3.00

                },
                count:6}
                ,
                {
                    items: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        category:'食品',
                        subCategory:'碳酸饮料',
                        price: 3.00

                    },
                    count:5
              }],promotion);
            var cart=[
                {
                    cartItems: {
                        items: {
                            barcode: 'ITEM000000',
                            name: '可口可乐',
                            unit: '瓶',
                            category: '食品',
                            subCategory: '碳酸饮料',
                            price: 3.00
                        },
                        count: 6
                    },
                    subTotal: 17.10,
                    save:0.90},
                {
                    cartItems: {
                        items: {
                            barcode: 'ITEM000001',
                            name: '雪碧',
                            unit: '瓶',
                            category:'食品',
                            subCategory:'碳酸饮料',
                            price: 3.00
                        },
                        count: 5
                    },
                    subTotal: 14.25,
                    save:0.75

                }];
            expect(cartItems).toEqual(cart);

        });
        it("when item is saleItem,but num less than 10",function () {
            var cartItems=buildCartItems([ {
                items: {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    category:'食品',
                    subCategory:'碳酸饮料',
                    price: 3.00

                },
                count:2
            }],promotion);
            var cart=[
                {
                    cartItems: {
                        items: {
                            barcode: 'ITEM000001',
                            name: '雪碧',
                            unit: '瓶',
                            category:'食品',
                            subCategory:'碳酸饮料',
                            price: 3.00

                        },
                        count: 2
                    },
                    subTotal: 6.00,
                    save: 0.00

                }];
            expect(cartItems).toEqual(cart);

        });
        it("when item is not saleItem and num less than 10",function () {
            var cartItems=buildCartItems([
                {
                    items: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        category:'食品',
                        subCategory:'水果',
                        price: 15.00

                    },
                    count: 2

                }],promotion);
            var cart=[
                {
                    cartItems:
                    {
                        items: { barcode: 'ITEM000003',
                            name: '荔枝',
                            unit: '斤',
                            category:'食品',
                            subCategory:'水果',
                            price: 15.00
                        },
                        count: 2

                    },
                    subTotal: 30.00,
                    save: 0.00

                }];
            expect(cartItems).toEqual(cart);

        });
        it("when item is not saleItem,but num more than 10",function () {
            var cartItems=buildCartItems([
                {
                    items: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        category:'食品',
                        subCategory:'水果',
                        price: 15.00
                    },
                    count:10

                }],promotion);
            var cart=[
                {
                    cartItems:
                    {
                        items: {
                            barcode: 'ITEM000003',
                            name: '荔枝',
                            unit: '斤',
                            category:'食品',
                            subCategory:'水果',
                            price: 15.00

                        },
                        count: 10

                    },
                    subTotal: 150.00,
                    save: 0.00

                }];
            expect(cartItems).toEqual(cart);

        });
        it("count all",function () {
            var items=buildItemsCount(allItems,item);
            var cartItems=buildCartItems(items,promotion);
            var cart=[
                {
                    cartItems:
                    {
                        items: {
                            barcode: 'ITEM000000',
                            name: '可口可乐',
                            unit: '瓶',
                            category:'食品',
                            subCategory:'碳酸饮料',
                            price: 3.00

                        },
                        count: 6
                    },
                    subTotal: 17.10,
                    save: 0.90
                }
                ,
                {cartItems:
                {
                    items: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        category:'食品',
                        subCategory:'碳酸饮料',
                        price: 3.00

                    },
                    count: 5
                },
                    subTotal: 14.25,
                    save: 0.75
                },
                {cartItems:
                {
                    items: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        category:'食品',
                        subCategory:'水果',
                        price: 15.00
                    },
                    count: 2
                },
                    subTotal:30.00,
                    save: 0.00
                }
            ];
            expect(cartItems).toEqual(cart);

        });

    });
    describe("count total and save",function () {
        it("count items is sale",function () {
            var receipt=buildReceiptItems([
                {
                    cartItems:
                    {
                        items: {
                          barcode: 'ITEM000000',
                          name: '可口可乐',
                          unit: '瓶',
                          category:'食品',
                          subCategory:'碳酸饮料',
                          price: 3.00
                        },
                        count:10

                    },
                    subTotal: 28.50,
                    save: 1.50

                },
              {
                cartItems:{
                  items:{
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    category:'食品',
                    subCategory:'碳酸饮料',
                    price: 3.00
                  },
                  count:2
                },
                subTotal:5.70,
                save:0.30
              }]);
            var receiptItem={};
            receiptItem.receiptItem=[ {
                cartItems:
                {

                  items: {
                    barcode: 'ITEM000000',
                    name: '可口可乐',
                    unit: '瓶',
                    category:'食品',
                    subCategory:'碳酸饮料',
                    price: 3.00
                  },
                  count:10

                },
              subTotal: 28.50,
              save: 1.50

            },
                {
                    cartItems:{
                        items:{
                            barcode: 'ITEM000001',
                            name: '雪碧',
                            unit: '瓶',
                            category:'食品',
                            subCategory:'碳酸饮料',
                            price: 3.00
                        },
                        count:2
                    },
                    subTotal:5.70,
                    save:0.30
                }];
            receiptItem.total=34.20;
            receiptItem.saveMoney=1.80;

            expect(receipt).toEqual(receiptItem);

        });
        it("count item is not sale",function () {
            var receipt=buildReceiptItems([
                {
                    cartItems:
                    {
                        items: {
                            barcode: 'ITEM000002',
                            name: '苹果',
                            unit: '斤',
                            category:'食品',
                            subCategory:'水果',
                            price: 5.50

                        },
                        count: 2

                    },
                    subTotal: 11.00,
                    save: 0.00

                },
                {
                    cartItems:{
                        items: {
                            barcode: 'ITEM000003',
                            name: '荔枝',
                            unit: '斤',
                            category:'食品',
                            subCategory:'水果',
                            price: 15.00
                        },
                        count:3
                    },
                    subTotal:45.00,
                    save:0.00
                }]);
            var receiptItem={};
            receiptItem.receiptItem=[ {
                cartItems:
                {
                    items: {
                        barcode: 'ITEM000002',
                        name: '苹果',
                        unit: '斤',
                        category:'食品',
                        subCategory:'水果',
                        price: 5.50

                    },
                    count: 2

                },
                subTotal: 11.00,
                save: 0.00

            },
                {
                    cartItems:{
                        items: {
                            barcode: 'ITEM000003',
                            name: '荔枝',
                            unit: '斤',
                            category:'食品',
                            subCategory:'水果',
                            price: 15.00

                        },
                        count:3
                    },
                    subTotal:45.00,
                    save:0.00
                }];
            receiptItem.total=56.00;
            receiptItem.saveMoney=0.00;

            expect(receipt).toEqual(receiptItem);


        });
        it("count all",function () {
            var items=buildItemsCount(allItems,item);
            var Allitem=buildCartItems(items,promotion);
            var receipt=buildReceiptItems(Allitem);
            var receiptItem={};
            receiptItem.receiptItem=[
                {
                    cartItems:
                    {
                        items: {
                            barcode: 'ITEM000000',
                            name: '可口可乐',
                            unit: '瓶',
                            category:'食品',
                            subCategory:'碳酸饮料',
                            price: 3.00
                        },
                        count:6

                    },
                    subTotal: 17.10,
                    save: 0.90

                },{

                cartItems:
                {
                    items: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        category:'食品',
                        subCategory:'碳酸饮料',
                        price: 3.00

                    },
                    count:5

                },
                subTotal: 14.25,
                save: 0.75

            },
                {
                    cartItems:{
                        items: {
                            barcode: 'ITEM000003',
                            name: '荔枝',
                            unit: '斤',
                            category:'食品',
                            subCategory:'水果',
                            price: 15.00
                        },
                        count:2
                    },
                    subTotal:30.00,
                    save:0.00
                }];
            receiptItem.total=61.35;
            receiptItem.saveMoney=1.65;

            expect(receipt).toEqual(receiptItem);
        });

    });
});




