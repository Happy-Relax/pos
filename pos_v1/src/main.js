//TODO: Please write code in this file.
function printInventory(inputs)
{
    //*******************************
    //商品计数，输入：inputs（条形码编码），输出：CartItems=[{name:'',count:,price:,unit:''}]
    var CartItems=new Array(),p=0,str,num,sub=0,load_sub=0,AllItems=loadAllItems();
    for(var i=0;i<inputs.length;i++)
    {
        //in:inputs;out:str,num
        for(var j=0;j<inputs[i].length;j++)
        {
            if(inputs[i].slice(j,j+1)=='-')
            {
                str=inputs[i].slice(0,j);
                num=parseInt(inputs[i].slice(j+1));
                break;
            }
            else
            {
                str=inputs[i];
                num=1;
            }


        }
        //
        //in:str,loadAllItems();out:load_sub;
        for(var j=0;j<AllItems.length;j++)
        {
            if(str==AllItems[j].barcode)
            {
                load_sub=j;
                break;
            }

        }


        //in:load_sub,loadAllItems();out CartItems[j]
        for(var j=0;j<CartItems.length;j++)
        {
            if(CartItems[j].name==AllItems[load_sub].name)
            {
                p=1;
                sub=j;
                break;
            }
        }

        if(p==0)
        {
            CartItems.push({name:AllItems[load_sub].name,count:num,price:AllItems[load_sub].price,unit:AllItems[load_sub].unit,barcode:AllItems[load_sub].barcode});

        }
        else
        {
            CartItems[sub].count+=num;
        }

        p=0;
    }
    //***************************************

    //*********************************
    //商品计价，输入：CartItems;输出：priceItems
    var priceItems=new Array(),l_promotions=loadPromotions()[0].barcodes,totalprice=0,promotion_price=0;

    for(var i=0;i<CartItems.length;i++)
    {
        //input:CartItems,output:tt_price
        tt_price=CartItems[i].price*CartItems[i].count;
        //input:CartItems,output:promotion_price
        for(var j=0;j<l_promotions.length;j++)
        {
            if(l_promotions[j]==CartItems[i].barcode)
            {
                promotion_price=parseInt(CartItems[i].count/3)*CartItems[i].price;
                break;
            }
            else
            {
                promotion_price=0;
            }
        }
        var string='a'+promotion_price;

        //input:CartItems,tt_price,promotion_price;output:priceItems[]
       priceItems.push({name:CartItems[i].name,count:CartItems[i].count,price:CartItems[i].price,unit:CartItems[i].unit,totalprice:tt_price,promotionprice:promotion_price});
    }
    //**********************************

    //***********************************
    //优惠商品列表，输入：priceItems,输出:GiftItems
    var GiftItems=new Array();

    for(var i=0;i<priceItems.length;i++)
    {
        if(priceItems[i].promotionprice!=0)
        {
            num=parseInt(priceItems[i].promotionprice/priceItems[i].price);
            GiftItems.push({name:priceItems[i].name,promotioncount:num,unit:priceItems[i].unit});

        }
    }
    //*************************************

    //************************************
    //总计,输入：priceItems，输出：Receipt
    var Receipt={total:0,save:0}
    for(var i=0;i<priceItems.length;i++)
    {
        Receipt.total+=priceItems[i].totalprice;
        Receipt.save+=priceItems[i].promotionprice;
    }
    Receipt.total-=Receipt.save;
   //****************************************

   //***************************************
   //打印，输入:priceItems,GiftItems,Receipt
   var string=('***<没钱赚商店>购物清单***\n');
   for(var i=0;i<priceItems.length;i++)
   {
    var num=priceItems[i].totalprice-priceItems[i].promotionprice;
    string+='名称：'+priceItems[i].name+'，数量：'+priceItems[i].count+priceItems[i].unit+'，单价：'+priceItems[i].price.toFixed(2)+'(元)，小计：'+num.toFixed(2)+'(元)\n';
//    console.log(string);
   }


   if(GiftItems.length>0)
   {
    string+='----------------------\n';
   }
   for(var i=0;i<GiftItems.length;i++)
   {
    string+='名称：'+GiftItems[i].name+'，数量：'+GiftItems[i].promotioncount+GiftItems[i].unit+'\n';
//    console.log(string);
   }
   string+='----------------------\n';

   string+='总计：'+Receipt.total.toFixed(2)+'(元)\n' +'节省：'+Receipt.save.toFixed(2)+'(元)\n'+'**********************';
   console.log(string);

}