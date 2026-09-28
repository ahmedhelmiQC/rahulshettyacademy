import { expect, Locator , Page } from "@playwright/test";
import { BasePage } from "./basePage";
import{userdata} from "../Data/testdata";

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
        this.Occupation   = page.locator("select").filter({hasText:"Engineer"});
        this.genderMale   = page.getByRole("radio",{name:"Male",exact:true})
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
        await this.rigesterLink.click();
        await this.firstName.fill(userdata.firstName);
        await this.lastName.fill(userdata.lastName);
        await this.email.fill(userdata.email);
        await this.phoneNumber.fill(userdata.phoneNumber);
        await this.Occupation.click();
        await this.genderMale.click();
        await this.password.fill(userdata.password);
        await this.confirmPass.fill(userdata.password);
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