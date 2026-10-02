import { expect, Locator , Page } from "@playwright/test";


export class ProductsPage{

    
    readonly cart     : Locator;
    // readonly addtocart : Locator;



    constructor(page:Page){
       
        this.cart     = page.locator("button[routerlink='/dashboard/cart']");
    }

    async addProductToCart(page:Page, productname:string){
        const product = page.locator(".col-lg-4").filter({hasText:productname}).getByRole("button", {name:" Add To Cart"}); 

         await product.click();

       // expect(this.cart).toContainText("  Cart 1");
        await this.cart.click();
    }
}