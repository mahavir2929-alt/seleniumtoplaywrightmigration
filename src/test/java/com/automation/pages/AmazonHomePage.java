package com.automation.pages;

import com.automation.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class AmazonHomePage {

    private final WebDriver driver;

    private final By searchTextbox = By.id("twotabsearchtextbox");
    private final By searchSubmitButton = By.id("nav-search-submit-button");

    public AmazonHomePage(WebDriver driver) {
        this.driver = driver;
    }

    public void searchProduct(String productName) {
        WaitUtils.waitForVisibility(driver, searchTextbox).clear();
        WaitUtils.waitForVisibility(driver, searchTextbox).sendKeys(productName);
        WaitUtils.waitForClickable(driver, searchSubmitButton).click();
    }
}
