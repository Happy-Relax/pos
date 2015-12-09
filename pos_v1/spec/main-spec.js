describe('pos', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print correct text', function () {

        spyOn(console, 'log');

        printInventory(inputs);

        var expectText =
            '***<没钱赚商店>购物清单***\n' +
            '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
            '----------------------\n' +
            '挥泪赠送商品：\n' +
            '名称：雪碧，数量：1瓶\n' +
            '名称：方便面，数量：1袋\n' +
            '----------------------\n' +
            '总计：51.00(元)\n' +
            '节省：7.50(元)\n' +
            '**********************';

          expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it('Cut("ITEM000003-2")', function () {

//            spyOn(console, 'log');

            var expectText ={barcode:'ITEM000003',num:2};
            var actual=Cut('ITEM000003-2');

              expect(actual).toEqual(expectText);
     });

     it("Information({barcode:'ITEM000001',num:1},loadAllItems())", function () {



            var expectText ={ barcode: 'ITEM000001', num:1, name: '雪碧', unit: '瓶',price: 3.00};
            var actual=Information({barcode:'ITEM000001',num:1},loadAllItems());

              expect(actual).toEqual(expectText);
     });

     it("Count(CartItems_information)", function () {



            var expectText =[ {barcode:'ITEM000001',count:5,name:'雪碧',price:3,unit:'瓶'}
                              ,{barcode:'ITEM000003',count:2,name:'荔枝',price:15,unit:'斤'}
                              ,{barcode:'ITEM000005',count:3,name:'方便面',price:4.5,unit:'袋'}];

            var actual=Count([{barcode:'ITEM000001',num:1,name:'雪碧',price:3,unit:'瓶'}
                              ,{barcode:'ITEM000001',num:1,name:'雪碧',price:3,unit:'瓶'}
                              ,{barcode:'ITEM000001',num:1,name:'雪碧',price:3,unit:'瓶'}
                              ,{barcode:'ITEM000001',num:1,name:'雪碧',price:3,unit:'瓶'}
                              ,{barcode:'ITEM000001',num:1,name:'雪碧',price:3,unit:'瓶'}

                              ,{barcode:'ITEM000003',num:2,name:'荔枝',price:15,unit:'斤'}

                              ,{barcode:'ITEM000005',num:1,name:'方便面',price:4.5,unit:'袋'}
                              ,{barcode:'ITEM000005',num:1,name:'方便面',price:4.5,unit:'袋'}
                              ,{barcode:'ITEM000005',num:1,name:'方便面',price:4.5,unit:'袋'}]);

              expect(actual).toEqual(expectText);
     });

     it("Count_all(inputs)", function () {



            var expectText  =[ {barcode:'ITEM000001',count:5,name:'雪碧',price:3,unit:'瓶'}
                                ,{barcode:'ITEM000003',count:2,name:'荔枝',price:15,unit:'斤'}
                                ,{barcode:'ITEM000005',count:3,name:'方便面',price:4.5,unit:'袋'}];
            var actual=Count_all(inputs);

              expect(actual).toEqual(expectText);
     });

     it("Promotion(CartItems,l_promotions)", function () {

            var l_promotions=loadPromotions()[0].barcodes

            var expectText =[ {count:5,name:'雪碧',price:3,unit:'瓶',promotionprice:3}
                              ,{count:2,name:'荔枝',price:15,unit:'斤',promotionprice:0}
                              ,{count:3,name:'方便面',price:4.5,unit:'袋',promotionprice:4.5}];
            var CartItems=[ {barcode:'ITEM000001',count:5,name:'雪碧',price:3,unit:'瓶'}
                              ,{barcode:'ITEM000003',count:2,name:'荔枝',price:15,unit:'斤'}
                              ,{barcode:'ITEM000005',count:3,name:'方便面',price:4.5,unit:'袋'}];
            var actual=Promotion(CartItems,l_promotions);

              expect(actual).toEqual(expectText);
     });

     it("total(promotion_priceItems)", function () {



            var promotion_priceItems =[ {count:5,name:'雪碧',price:3,unit:'瓶',promotionprice:3}
                              ,{count:2,name:'荔枝',price:15,unit:'斤',promotionprice:0}
                              ,{count:3,name:'方便面',price:4.5,unit:'袋',promotionprice:4.5}];

            var expectText=[ {count:5,name:'雪碧',price:3,unit:'瓶',promotionprice:3,totalprice:12}
                             ,{count:2,name:'荔枝',price:15,unit:'斤',promotionprice:0,totalprice:30}
                             ,{count:3,name:'方便面',price:4.5,unit:'袋',promotionprice:4.5,totalprice:9}];

            var actual=total(promotion_priceItems);

              expect(actual).toEqual(expectText);
     });

     it("Price(CartItems)", function () {


            var l_promotions=loadPromotions()[0].barcodes
            var expectText =[ {count:5,name:'雪碧',price:3,unit:'瓶',promotionprice:3,totalprice:12}
                             ,{count:2,name:'荔枝',price:15,unit:'斤',promotionprice:0,totalprice:30}
                            ,{count:3,name:'方便面',price:4.5,unit:'袋',promotionprice:4.5,totalprice:9}];
            var CartItems=[ {barcode:'ITEM000001',count:5,name:'雪碧',price:3,unit:'瓶'}
                           ,{barcode:'ITEM000003',count:2,name:'荔枝',price:15,unit:'斤'}
                           ,{barcode:'ITEM000005',count:3,name:'方便面',price:4.5,unit:'袋'}];

            var actual=Price(CartItems);

            expect(actual).toEqual(expectText);
     });

     it("Gift(priceItems)", function () {


            var l_promotions=loadPromotions()[0].barcodes
            var expectText =[ {name:'雪碧',promotioncount:1,unit:'瓶'}
                             ,{name:'方便面',promotioncount:1,unit:'袋'}];
            var priceItems=[ {count:5,name:'雪碧',price:3,unit:'瓶',promotionprice:3,totalprice:12}
                            ,{count:2,name:'荔枝',price:15,unit:'斤',promotionprice:0,totalprice:30}
                             ,{count:3,name:'方便面',price:4.5,unit:'袋',promotionprice:4.5,totalprice:9}];

            var actual=Gift(priceItems);

            expect(actual).toEqual(expectText);
     });


     it("Sum(priceItems)", function () {


            var l_promotions=loadPromotions()[0].barcodes
            var expectText ={total:51,save:7.5};
            var priceItems=[ {count:5,name:'雪碧',price:3,unit:'瓶',promotionprice:3,totalprice:12}
                            ,{count:2,name:'荔枝',price:15,unit:'斤',promotionprice:0,totalprice:30}
                             ,{count:3,name:'方便面',price:4.5,unit:'袋',promotionprice:4.5,totalprice:9}];

            var actual=Sum(priceItems);

            expect(actual).toEqual(expectText);
     });

     it("PrintAllItems(priceItems)", function () {

            spyOn(console, 'log');

            var expectText ='***<没钱赚商店>购物清单***\n' +
                             '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
                             '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
                             '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n';
            var priceItems=[ {count:5,name:'雪碧',price:3,unit:'瓶',promotionprice:3,totalprice:12}
                            ,{count:2,name:'荔枝',price:15,unit:'斤',promotionprice:0,totalprice:30}
                             ,{count:3,name:'方便面',price:4.5,unit:'袋',promotionprice:4.5,totalprice:9}];

           console.log(PrintAllItems(priceItems));

            expect(console.log).toHaveBeenCalledWith(expectText);
     });

     it("PrintGiftItems(GiftItems)", function () {

            spyOn(console, 'log');

            var expectText ='----------------------\n' +
                             '挥泪赠送商品：\n' +
                             '名称：雪碧，数量：1瓶\n' +
                             '名称：方便面，数量：1袋\n';
            var GiftItems=[ {name:'雪碧',promotioncount:1,unit:'瓶'},{name:'方便面',promotioncount:1,unit:'袋'}]

           console.log(PrintGiftItems(GiftItems));

            expect(console.log).toHaveBeenCalledWith(expectText);
     });

     it("PrintSum(Receipt)", function () {

            spyOn(console, 'log');

            var expectText ='----------------------\n' +
                        '总计：51.00(元)\n' +
                         '节省：7.50(元)\n' +
                          '**********************';
            var Receipt={total:51,save:7.5};

           console.log(PrintSum(Receipt));

            expect(console.log).toHaveBeenCalledWith(expectText);
     });


     it("Print(priceItems,GiftItems,Receipt)", function () {

            spyOn(console, 'log');

            var expectText ='***<没钱赚商店>购物清单***\n' +
                                        '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
                                        '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
                                        '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
                                        '----------------------\n' +
                                        '挥泪赠送商品：\n' +
                                        '名称：雪碧，数量：1瓶\n' +
                                        '名称：方便面，数量：1袋\n' +
                                        '----------------------\n' +
                                        '总计：51.00(元)\n' +
                                        '节省：7.50(元)\n' +
                                        '**********************';
            var Receipt={total:51,save:7.5};
            var GiftItems=[ {name:'雪碧',promotioncount:1,unit:'瓶'},{name:'方便面',promotioncount:1,unit:'袋'}];
            var priceItems=[ {count:5,name:'雪碧',price:3,unit:'瓶',promotionprice:3,totalprice:12}
                                        ,{count:2,name:'荔枝',price:15,unit:'斤',promotionprice:0,totalprice:30}
                                         ,{count:3,name:'方便面',price:4.5,unit:'袋',promotionprice:4.5,totalprice:9}];
           console.log(Print(priceItems,GiftItems,Receipt));

            expect(console.log).toHaveBeenCalledWith(expectText);
     });
});
