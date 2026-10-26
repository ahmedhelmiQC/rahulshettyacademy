import { expect, Locator , Page } from "@playwright/test";


export class ProductsPage{

    readonly cart     : Locator;
    readonly page: Page;

    constructor(page:Page){
        this.page =page;
       
        this.cart = page.locator("button[routerlink='/dashboard/cart']");
    }

     productCard(productname: string): Locator {
        return this.page.locator(".col-lg-4").filter({
            hasText: productname});
    }

    async addProductToCart( productname:string){
        const product =this.productCard(productname).getByRole("button", {name:" Add To Cart"}); 

         await product.click();

       expect(this.cart).toContainText("  Cart 1");
        await this.cart.click();
    }

     
}