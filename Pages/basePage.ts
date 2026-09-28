import{Page} from"@playwright/test"

export class BasePage{

    static readonly URL = "https://rahulshettyacademy.com/client/#/auth/login";

    constructor(readonly page:Page){}

    async open(){
        await this.page.goto(BasePage.URL);
    }
}