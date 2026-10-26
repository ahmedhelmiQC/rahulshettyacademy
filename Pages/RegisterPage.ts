import { expect, Locator , Page } from "@playwright/test";
import { BasePage } from "./basePage";
import registerdata from "../TestData/data.json";

export class RegisterPage extends BasePage {

    

    readonly rigesterLink : Locator;

    readonly firstName    : Locator;
    readonly lastName     : Locator;
    readonly email        : Locator;
    readonly phoneNumber  : Locator;
    readonly Occupation   : Locator;
    readonly genderMale   : Locator;
    readonly password     : Locator;
    readonly confirmPass  : Locator;
    readonly age          : Locator;
    readonly rigesterBtn  : Locator;
    readonly loginBtn     : Locator;
    readonly successMess  : Locator;

    constructor(readonly page:Page){
        super(page);
        this.rigesterLink = page.locator(".text-reset");
        this.firstName    = page.getByPlaceholder("First Name");
        this.lastName     = page.getByLabel("Last Name");
        this.email        = page.getByPlaceholder("email@example.com");
        this.phoneNumber  = page.getByPlaceholder("enter your number");
        this.Occupation   = page.getByRole("combobox");
        this.genderMale   = page.getByRole("radio",{name:registerdata.Register.gender,exact:true})
        this.password     = page.locator("#userPassword");
        this.confirmPass  = page.getByPlaceholder("Confirm Passsword");
        this.age          = page.getByRole("checkbox");
        this.rigesterBtn  = page.getByRole("button",{name:"Register"});

        this.loginBtn     = page.getByRole("button",{name:"Login"});
        this.successMess  = page.getByText("Account Created Successfully");
    }

    async open(): Promise<void> {
        await super.open();
    }

    async validRegister(){
        const register = registerdata.Register;

        await this.rigesterLink.click();
        await this.firstName.fill(register.firstName);
        await this.lastName.fill(register.lastName);
        await this.email.fill(register.email);
        await this.phoneNumber.fill(register.phoneNumber);
        await this.Occupation.selectOption(register.Occupation);
        await this.genderMale.click();
        await this.password.fill(register.password);
        await this.confirmPass.fill(register.password);
        await this.age.check();
        await this.rigesterBtn.click();
    }

    async checkLoginBtn(){
     expect(this.loginBtn).toBeVisible;
     await expect(this.successMess).toContainText("Account Created Successfully");
    }

    async openLoginPage(){
        await this.loginBtn.click();
    }


}
