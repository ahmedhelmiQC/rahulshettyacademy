import { Locator , Page } from "@playwright/test";
import { BasePage } from "../Pages/basePage";
export class CartPage extends BasePage{

    readonly CheckoutBtn : Locator;


    constructor(page:Page){
        super(page);
        this.CheckoutBtn = page.getByRole("button",{name:"Buy Now"});
    }

    async clickBuyNow(){
        await this.CheckoutBtn.click();
    }
}