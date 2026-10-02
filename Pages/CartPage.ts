import { Locator , Page } from "@playwright/test";
import { BasePage } from "../Pages/basePage";
export class CartPage extends BasePage{

    readonly buyNowBtn: Locator;


    constructor(page:Page){
        super(page);
        this.buyNowBtn = page.getByRole("button",{name:"Buy Now"});
    }

    async clickBuyNow(){
        await this.buyNowBtn.click();
    }
}