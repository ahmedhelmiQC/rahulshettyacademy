import{expect, test} from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { ProductsPage } from "../Pages/ProductsPage";
import {CartPage} from "../Pages/CartPage";
import { PaymentPage } from "../Pages/PaymentPage";
import loginData from "../TestData/data.json";
import productsData from "../TestData/data.json";




const logindata = loginData.login;
const product   = productsData.Products;


for (const { email, password, validity } of logindata) {
test.only(`verify to login-${email} /${password} `,async({page})=>{
    
    const loginpage = new LoginPage(page);
    
    await loginpage.open();
    await loginpage.userLogin(email,password);

    if(validity.toLocaleLowerCase()==="valid"){
       await expect(page).toHaveURL(/dashboard/!);
    }
    else if (email.trim()==="") {
        await expect(
            page.getByText("*Email is required")
        ).toBeVisible();
        
    } else if (!email.includes("@")) {
            await expect(
                page.getByText("*Enter Valid Email")
            ).toBeVisible();
    }
     else 
          await expect(
            page.getByText("*Password is required")
        ).toBeVisible(); 
})
}

for (const { name, status } of product){
test(`add  ${status} Product ${name} To Cart `,async({page})=>{
    const loginpage = new LoginPage(page);
    const productspage = new ProductsPage(page);
   
    await loginpage.open();
    await loginpage.userLogin(logindata[0].email,logindata[0].password);

    const productCart = productspage.productCard(name);

   
   if(status==="valid"){
    await expect(productCart).toHaveCount(1);
    await productspage.addProductToCart(name);

     await expect(page).toHaveURL(/cart/!);
   }
   else
    await expect(productCart).toHaveCount(0);
})}


test("verify user login and buy the product",async({page})=>{
    
    const loginpage = new LoginPage(page);
    const productspage = new ProductsPage(page);
    const cart = new CartPage(page);
    const payment = new PaymentPage(page);
  
    
    await loginpage.open();
    await loginpage.userLogin(logindata[0].email,logindata[0].password);

    await productspage.addProductToCart(product[0].name);

    await cart.clickBuyNow();
    
    await payment.fillPaymentForm();
    
})