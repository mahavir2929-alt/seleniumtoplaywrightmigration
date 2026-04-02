package com.automation.base;

import com.automation.utils.ConfigReader;
import com.automation.utils.DriverFactory;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

public class BaseTest {

    protected WebDriver driver;

    @BeforeClass(alwaysRun = true)
    public void setUp() {
        driver = DriverFactory.initDriver(ConfigReader.get("browser"));
        driver.get(ConfigReader.get("base.url"));
    }

    @AfterClass(alwaysRun = true)
    public void tearDown() {
        DriverFactory.quitDriver();
    }
}
