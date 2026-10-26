import { Locator , Page } from "@playwright/test";
import { BasePage } from "./basePage";




export class LoginPage extends BasePage{

    readonly emailField    : Locator;
    readonly passwordField : Locator;   
    readonly loginBtn : Locator;

    constructor(page:Page){
        super(page);
        this.emailField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
        this.loginBtn = page.locator("#login");
    }
  

    async userLogin(email:string , password:string){

        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();

    }
    
    
}
