import {expect, Locator , Page } from"@playwright/test";
import { BasePage } from "./basePage";
import Paymentdata from "../TestData/data.json";


export class PaymentPage extends BasePage{

    

    readonly creditCard      : Locator;
    readonly CVVCode         : Locator;
    readonly name            : Locator;
    readonly Coupon          : Locator;
    readonly CouponBtn       : Locator;
    readonly country         : Locator;
    readonly suggescountry   : Locator;
    readonly placeorder      : Locator;
    readonly successMasseg   : Locator;

    constructor(page:Page){
        super(page);
        this.creditCard = page.locator(".field").filter({hasText:/Credit Card Number/!}).locator("input");
        this.CVVCode    = page.locator(".field").filter({hasText:/CVV Code/!}).locator("input");
        this.name       = page.locator(".field").filter({hasText:"Name on Card"}).locator("input");
        this.Coupon     = page.locator(".field").filter({hasText:"Apply Coupon "}).locator("input");
        this.CouponBtn  = page.getByRole("button",{name:"Apply Coupon"});
        this.country    = page.getByPlaceholder("Select Country");
        this.suggescountry = page.locator(".ta-results").
                                filter({hasText:Paymentdata.payment.suggescountry})
        this.placeorder  = page.locator('a.action__submit');
        this.successMasseg=page.locator(".hero-primary");
    }

    async fillPaymentForm(){
     const payment = Paymentdata.payment;

        await this.creditCard.fill(payment.creditCard);
        await this.CVVCode.fill(payment.CVVCode);
        await this.name.fill(payment.name);
        await this.Coupon.fill(payment.Coupon);
        await this.CouponBtn.click();

        await this.country.click();
        await this.country.pressSequentially(payment.country);
        await this.suggescountry.click();
        await this.placeorder.click();
        expect(this.successMasseg).toContainText("Thankyou for the order.");
    }
}