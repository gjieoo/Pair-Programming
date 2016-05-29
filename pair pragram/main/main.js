function printReceipt(inputs)
{
    var allItems = loadAllItems();
    var promotions = loadPromotions();
    var itemsCount = buildItemsCount(allItems,inputs);
    var cartItems = buildCartItems(itemsCount,promotions);
    var receiptItems = buildReceiptItems(cartItems);
    var receiptInfo = toReceiptInfo(receiptItems);

    console.log(receiptInfo);
}

function buildItemsCount(allItems,inputs) {

    var itemsCount=[];

    for(var i = 0;i < allItems.length;i++) {
        var count = 0;
        var item = [];

        for (var j = 0; j < inputs.length; j++) {
            var allItem = inputs[j];

            if (inputs[j].indexOf("-") != -1) {
                item = inputs[j].split("-");
                allItem = item[0];
                if (allItems[i].barcode === allItem) {
                    count = Number(item[1]);
                }
            }
            else {
                if (allItems[i].barcode === allItem) {
                    count++;
                }
            }
        }
        if (count != 0)
            itemsCount.push({items: allItems[i], count: count});
    }
    return itemsCount;
}

function buildCartItems(itemsCount,promotions) {

    var cartItems = [];
    var promotionCount=buildSameGoods(itemsCount,promotions[0].subCategory);
    for (var i = 0; i < itemsCount.length; i++) {

      promotion = 0;
      if (isSaleItems(itemsCount[i].items.subCategory, promotions[0].subCategory)) {
        if ((parseInt(promotionCount / 9)) > 0) {
          var subtotal = (itemsCount[i].items.price * itemsCount[i].count) * 95 / 100;
          var promotion = itemsCount[i].items.price * itemsCount[i].count * 0.05;
        }
        else {
          subtotal = itemsCount[i].items.price * itemsCount[i].count;

        }
        cartItems.push({cartItems: itemsCount[i], subTotal: subtotal, save: promotion});
      }

      else {

        subtotal = itemsCount[i].items.price * itemsCount[i].count;
        cartItems.push({cartItems: itemsCount[i], subTotal: subtotal, save: promotion});
      }
    }
    return cartItems;
}

function buildSameGoods(itemCount,item){
    var subCount=0;
    for (var i = 0; i < itemCount.length; i++){
      if(isSaleItems(itemCount[i].items.subCategory, item))
      {
         subCount+=itemCount[i].count;
      }
    }

    return subCount;
}

function isSaleItems(item,sale) {

  if (item === sale){
    return true;
  }

  return false;
  }

function buildReceiptItems(cartItems) {
    var receiptItems = {};
    var total = 0;
    var saveMoney = 0;

    for (var i = 0; i < cartItems.length; i++) {
      total += cartItems[i].subTotal;
      saveMoney += cartItems[i].save;
    }

    receiptItems.receiptItem = cartItems;
    receiptItems.total = total;
    receiptItems.saveMoney = saveMoney;

    return receiptItems;
  }

function toReceiptInfo(receiptItems, promotions) {
    var item = receiptItems.receiptItem;
    var receiptInfo = "***<没钱赚商店>收据***";

    for (var i = 0; i < item.length; i++) {
      if (item[i].save === 0) {
        receiptInfo+=noHaveSaveMoney(item[i]);
      }
      else {
        receiptInfo+=haveSaveMoney(item[i]);
      }
    }
    receiptInfo += "\n" + "----------------------";

     if (receiptItems.saveMoney != 0) {
        receiptInfo += "\n" + '批发价出售商品：';
        for(var i=0;i<item.length;i++)
        {
          if(item[i].save>0)
          receiptInfo +='名称：' + item[i].cartItems.items.name +
            '，数量：' + item[i].cartItems.count + item[i].cartItems.items.unit;
        }

      }
    receiptInfo += "\n" + "----------------------";
    if (receiptItems.saveMoney === 0) {
      receiptInfo += "\n" + "总计：" + receiptItems.total.toFixed(2) + "(元)";
    }
    else {
      receiptInfo += "\n" + "总计：" + receiptItems.total.toFixed(2) + "(元)"
        + "，节省：" + receiptItems.saveMoney.toFixed(2) + "(元)";

    }
    receiptInfo += "\n" + "**********************";

    return receiptInfo;
  }

function haveSaveMoney(item){

 return "\n" + "名称：" + item.cartItems.items.name +
   "，数量：" + item.cartItems.count + item.cartItems.items.unit +
   "，单价：" + item.cartItems.items.price.toFixed(2) + "(元)" +
   "，小计：" + item.subTotal.toFixed(2) + "(元)" +
   "，优惠：" + item.save.toFixed(2) + "(元)";
}

function noHaveSaveMoney(item){

  return "\n" + "名称：" + item.cartItems.items.name +
    "，数量：" + item.cartItems.count + item.cartItems.items.unit +
    "，单价：" + item.cartItems.items.price.toFixed(2) + "(元)" +
    "，小计：" + item.subTotal.toFixed(2) + "(元)";
}
