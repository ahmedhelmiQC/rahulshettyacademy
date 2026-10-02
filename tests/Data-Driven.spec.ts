import{expect, test} from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { ProductsPage } from "../Pages/ProductsPage";
import {CartPage} from "../pages/CartPage";
import { PaymentPage } from "../Pages/PaymentPage";
import loginData from "../TestData/data.json";
import productsData from "../TestData/data.json";


test.use({
    launchOptions: {slowMo: 500},
});

const logindata = loginData.login;
const products = productsData.Products[1];


for (const { email, password, validity } of logindata) {
test(`verify to login-${email} /${password} `,async({page})=>{
    
    const loginpage = new LoginPage(page);
    
    await loginpage.open();
    await loginpage.userLogin(email,password);

    if(validity.toLocaleLowerCase()==="valid"){
       await expect(page).toHaveURL(/rahulshettyacademy/!);
    }
    else if (email.trim()==="") {
        await expect(
            page.getByText("*Email is required")
        ).toBeVisible();
        
    } else 
          await expect(
            page.getByText("*Enter Valid Email")
        ).toBeVisible(); 
})
}


test.only(`add  valid Product ${products}To Cart `,async({page})=>{
    const loginpage = new LoginPage(page);
    const productspage = new ProductsPage(page);
   
    await loginpage.open();
    await loginpage.userLogin(logindata[0].email,logindata[0].password);

    await productspage.addProductToCart(page,products);
   
    
    
})


test("verify user login and buy the product",async({page})=>{
    
    const loginpage = new LoginPage(page);
    const productspage = new ProductsPage(page);
    const cart = new CartPage(page);
    const payment = new PaymentPage(page);
  
    
    await loginpage.open();
    await loginpage.userLogin(logindata[0].email,logindata[0].password);

    await productspage.addProductToCart(page,products[0]);

    await cart.clickBuyNow();
    
    await payment.fillPaymentForm();
    
})