import{test} from "@playwright/test";
import { BasePage } from "../Pages/basePage";
import { RegisterPage } from "../Pages/RegisterPage";

test.use({
    launchOptions: {slowMo: 300},
});

test("verify user buy boat",async({page})=>{
    const rigester = new RegisterPage(page);

    await rigester.open();
    await rigester.validRegister();
    await rigester.checkLoginBtn();
    await rigester.openLoginPage();
})