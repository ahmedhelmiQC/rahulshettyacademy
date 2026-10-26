import { Locator , Page } from "@playwright/test";
import { BasePage } from "../Pages/basePage";
export class CartPage extends BasePage{

    readonly CheckoutBtn : Locator;


    constructor(page:Page){
        super(page);
        this.CheckoutBtn = page.getByRole("button", { name: /buy now/i });
    }

    async clickCheckout(){
        await this.CheckoutBtn.click();
    }
}