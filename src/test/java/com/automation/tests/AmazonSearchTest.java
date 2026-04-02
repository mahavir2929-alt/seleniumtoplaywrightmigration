package com.automation.tests;

import com.automation.base.BaseTest;
import com.automation.pages.AmazonHomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class AmazonSearchTest extends BaseTest {

    @Test(description = "Navigate to Amazon and search for MacBook")
    public void searchForMacBookOnAmazon() {
        AmazonHomePage amazonHomePage = new AmazonHomePage(driver);
        amazonHomePage.searchProduct("macbook");

        String pageTitle = driver.getTitle().toLowerCase();
        Assert.assertTrue(pageTitle.contains("macbook"),
                "Search result page title should contain 'macbook'. Actual title: " + pageTitle);
    }
}
