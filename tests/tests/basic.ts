import { PinwheelPage, PinwheelSections } from "../page_objects/PinwheelSupernova";
import {
  EnhancedPageObject,
  NightwatchBrowser,
  NightwatchTests,
  WindowSize
} from "nightwatch";

import { assert } from "chai";

import {
  expectAllNotPresent,
  expectAllVisible,
} from "../utils";

type PinwheelTests = NightwatchTests & { app: PinwheelPage; sections: PinwheelSections };

const tests: PinwheelTests = {

  // Kinda kludgy, but this makes things work TypeScript-wise
  // We need to do this since the value get initialized in the `before` method
  app: null as unknown as (EnhancedPageObject & PinwheelPage),
  sections: null as unknown as PinwheelSections,

  before: function(browser: NightwatchBrowser): void {
    browser.globals.waitForConditionTimeout = 30000;
    this.app = browser.page.PinwheelSupernova();
    this.sections = this.app.section as PinwheelSections;
  },

  'Navigation and loading': function() {
    this.app.navigate().waitForReady();
  },

  'Initial configuration': function() {
    app.expect.title().to.equal(this.app.props.title);
    expectAllVisible(this.app, [
      "@splashScreen",
      "@splashClose"
    ]);
    expectAllNotPresent(this.app, [
      "@videoDialog",
      "@infoSheet"
    ]);
    
    this.app.click("@splashClose");
    expectAllNotPresent(this.app, [
      "@splashScreen",
      "@splashClose"
    ]);

    expectAllVisible(this.sections.topContent, [
      "@videoButton",
      "@showLocationSelectorButton",
      "@textButton",
      "@resetButton",
      "@constellationsButton",
      "@arrowButton"
    ]);

    const bottomContent = this.sections.bottomContent;
    expectAllVisible(bottomContent, [
      "@tools",
      "@chartButton",
      "@chartIconButton",
      "@playPauseButton",
      "@opacitySlider",
      "@credits"
    ]);

    expectAllNotPresent(bottomContent, [
      "@chartContainer",
      "@plot"
    ]);

    bottomContent.expect.elements("@creditsIcon").count.to.equal(bottomContent.props.creditIconCount);
  }
};

export default tests;
