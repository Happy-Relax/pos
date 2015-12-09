//TODO: Please write code in this file.
//商品计数*****************************************
//元素拆分
function Cut(input)
{
 var cut={barcode:'a',num:0};
 for(var i=0;i<input.length;i++)
 {
    if(input.slice(i,i+1)=='-')
        {cut={barcode:input.slice(0,i),num:parseInt(input.slice(i+1))};
         break;}
    else
        {cut={barcode:input,num:1};
         }
 }
 return cut;
}

//商品信息查询
function Information(cut,AllItems)
{
 var CartItem_information={barcode:'',num:0,name:'',price:0,unit:''};
 for(var i=0;i<AllItems.length;i++)
   {if(cut.barcode==AllItems[i].barcode)
     {CartItem_information={barcode:cut.barcode,num:cut.num,name:AllItems[i].name,price:AllItems[i].price,unit:AllItems[i].unit};
      break;}
   }
 return CartItem_information;
}
//商品计数
function Count(CartItems_information)
{
 var CartItems=new Array(),p=0;
 for(var i=0;i<CartItems_information.length;i++)
 {for(var j=0;j<CartItems.length;j++)
    {if(CartItems[j].name==CartItems_information[i].name)
        {p=1;
         break;}
    }
  if(p==0)
  {CartItems.push({barcode:CartItems_information[i].barcode,name:CartItems_information[i].name,price:CartItems_information[i].price,unit:CartItems_information[i].unit,count:CartItems_information[i].num})}
  else
  {CartItems[j].count+=CartItems_information[i].num;}
  p=0;
 }
 return CartItems;
}
//商品计数总函数
function Count_all(inputs)
{
 var CartItems=new Array(),CartItems_information=new Array();
 for(var i=0;i<inputs.length;i++)
 {CartItems_information.push(Information(Cut(inputs[i]),loadAllItems()));

 }
 CartItems=Count(CartItems_information);
 return CartItems;
}
//*************************************

//************************************************************
//优惠商品计价
function Promotion(CartItems,l_promotions)
{
   var promotion_priceItems=new Array();
   for(var i=0;i<CartItems.length;i++)
       {for(var j=0;j<l_promotions.length;j++)
           {if(l_promotions[j]==CartItems[i].barcode)
               { promotion_price=parseInt(CartItems[i].count/3)*CartItems[i].price;
                 break;}
            else
               {promotion_price=0;}}
        promotion_priceItems.push({name:CartItems[i].name,count:CartItems[i].count,price:CartItems[i].price,unit:CartItems[i].unit,promotionprice:promotion_price});
       }
   return promotion_priceItems;
}

//小计
function total(promotion_priceItems)
{
 var priceItems=new Array(),tt_price=0;
 for(var i=0;i<promotion_priceItems.length;i++)
    {tt_price=promotion_priceItems[i].price*promotion_priceItems[i].count-promotion_priceItems[i].promotionprice;
     priceItems.push({name:promotion_priceItems[i].name,count:promotion_priceItems[i].count,price:promotion_priceItems[i].price,unit:promotion_priceItems[i].unit,promotionprice:promotion_priceItems[i].promotionprice,totalprice:tt_price});
    }
 return priceItems;
}

//商品计价总函数
function Price(CartItems)
{
    var priceItems=new Array();
    priceItems=total(Promotion(CartItems,loadPromotions()[0].barcodes));
    return priceItems;
}
//****************************************

//***************************************
//优惠商品列表
function Gift(priceItems)
{
  var GiftItems=new Array(),num=0;
  for(var i=0;i<priceItems.length;i++)
     {
         if(priceItems[i].promotionprice!=0)
         {num=parseInt(priceItems[i].promotionprice/priceItems[i].price);
          GiftItems.push({name:priceItems[i].name,promotioncount:num,unit:priceItems[i].unit});
         }
     }
  return GiftItems;
}
//**************************************

//***********************************
//总计
function Sum(priceItems)
{
 var Receipt={total:0,save:0}
 for(var i=0;i<priceItems.length;i++)
     {
         Receipt.total+=priceItems[i].totalprice;
         Receipt.save+=priceItems[i].promotionprice;
     }

 return Receipt;
}
//*********************************************
//打印所有商品
function PrintAllItems(priceItems)
{
 var string=('***<没钱赚商店>购物清单***\n');
 for(var i=0;i<priceItems.length;i++)
    {
     var num=priceItems[i].totalprice;
     string+='名称：'+priceItems[i].name+'，数量：'+priceItems[i].count+priceItems[i].unit+'，单价：'+priceItems[i].price.toFixed(2)+'(元)，小计：'+num.toFixed(2)+'(元)\n';
    }
 return string;
}
//打印优惠商品
function PrintGiftItems(GiftItems)
{
 var string;
 string='----------------------\n挥泪赠送商品：\n';
 for(var i=0;i<GiftItems.length;i++)
    {
     string+='名称：'+GiftItems[i].name+'，数量：'+GiftItems[i].promotioncount+GiftItems[i].unit+'\n';
    }
 return string;
}

function PrintSum(Receipt)
{
 var string='----------------------\n';
 string+='总计：'+Receipt.total.toFixed(2)+'(元)\n' +'节省：'+Receipt.save.toFixed(2)+'(元)\n'+'**********************';
 return string;
}

//打印总函数
function Print(priceItems,GiftItems,Receipt)
{
 var string='';
 string=PrintAllItems(priceItems)+PrintGiftItems(GiftItems)+PrintSum(Receipt);
 console.log(string);
}

//*************************************
function printInventory(inputs)
{
    //1、每块代码不超过15行。2、只允许一级缩进（for-for or for-if）
    //商品计数，输入：inputs（条形码编码），输出：CartItems=[{name:'',count:,price:,unit:''}]
    var CartItems=new Array(),AllItems=loadAllItems();
    CartItems=Count_all(inputs);
    //商品计价，输入：CartItems;输出：priceItems
    var priceItems=new Array(),l_promotions=loadPromotions()[0].barcodes;
    priceItems=Price(CartItems);
    //优惠商品列表，输入：priceItems,输出:GiftItems
    var GiftItems=new Array();
    GiftItems=Gift(priceItems)
    //总计,输入：priceItems，输出：
    var Receipt={total:0,save:0}
    Receipt=Sum(priceItems)
   //打印第一部分--所有商品
   Print(priceItems,GiftItems,Receipt);
}