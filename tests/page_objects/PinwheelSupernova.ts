import { EnhancedPageObject, EnhancedSectionInstance, PageObjectModel } from "nightwatch";

const pinwheelCommands = {
  waitForReady(this: EnhancedPageObject): EnhancedPageObject {
    return this
      .waitForElementVisible("@app")
      .waitForElementVisible("@wwtComponent");
  }
};

const pinwheelElements = {
  app: {
    selector: "#app"
  },
  wwtComponent: {
    selector: ".wwtelescope-component"
  },
  mainContent: {
    selector: "#main-content"
  },
  splashScreen: {
    selector: "#splash-screen"
  },
  splashClose: {
    selector: "#splash-close"
  },
  topContent: {
    selector: "#top-content"
  },
  bottomContent: {
    selector: "#bottom-content"
  },
  videoDialog: {
    selector: "#video-container",
  },
  infoSheet: {
    selector: "#text-bottom-sheet"
  }
};

const topContent = {
  commands: {},
  sections: {},
  elements: {
    videoButton: {
      selector: "#video-icon-button"
    },
    showLocationSelectorButton: {
      selector: "#location-selector-button"
    },
    textButton: {
      selector: "#text-icon-button"
    },
    resetButton: {
      selector: "#reset-icon-button"
    },
    constellationsButton: {
      selector: "#constellations-icon-button"
    },
    arrowButton: {
      selector: "#arrow-icon-button"
    }
  }
};

const videoDialog = {
  commands: {},
  sections: {},
  elements: {
    closeIcon: {
      selector: "#video-close-icon"
    },
    video: {
      selector: "#info-video"
    }
  }
};

const bottomContent = {
  commands: {},
  sections: {},
  elements: {
    chartButton: {
      selector: "#chart-button"
    },
    chartIconButton: {
      selector: "#chart-icon-button"
    },
    chartContainer: {
      selector: "#chart-container"
    },
    plot: {
      selector: "#plot"
    },
    playPauseButton: {
      selector: "#play-pause-icon"
    },
    opacitySlider: {
      selector: "#opacity-slider"
    }
  }
};

const infoSheet = {
  commands: {},
  sections: {},
  elements: {
    tabHeader: {
      selector: ".v-tab"
    },
    infoTabHeader: {
      selector: ".v-tab:nth-of-type(1)"
    },
    wwtTabHeader: {
      selector: ".v-tab:nth-of-type(2)"
    },
    closeIcon: {
      selector: "#close-text-icon"
    },
    textWindow: {
      selector: ".v-window"
    },
    textItem: {
      selector: ".v-window-item .v-card-text"
    },
    infoText: {
      selector: ".v-window-item:nth-of-type(1) .v-card-text"
    },
    wwtText: {
      selector: ".v-window-item:nth-of-type(2) .v-card-text"
    }
  },

  props: {
    tabCount: 2
  }
};


const pinwheelSections = {
  topContent: {
    selector: "#top-content",
    ...topContent
  },
  bottomContent: {
    selector: "#bottom-content",
    ...bottomContent
  },
  videoDialog: {
    selector: "#video-container",
    ...videoDialog
  },
  infoSheet: {
    selector: "#text-bottom-sheet",
    ...infoSheet
  }
};

const pinwheelProps = {
  title: "See the Pinwheel Galaxy Supernova change over time!",
  chartTitle: "Supernova Light Curve (Change in Brightness over Time)"
};

const pinwheelPage: PageObjectModel = {
  url: "http://localhost:8080",
  commands: [pinwheelCommands],
  props: pinwheelProps,
  elements: pinwheelElements,
  sections: pinwheelSections
} as const;

export default pinwheelPage;

export type PinwheelPage =
  EnhancedPageObject<typeof pinwheelCommands,
                     typeof pinwheelElements,
                     typeof pinwheelSections> &
                     { props: typeof pinwheelProps };

type Section = keyof typeof pinwheelSections;
type SectionInfo<S extends Section> = typeof pinwheelSections[S];
export type PinwheelSections = {
  [key in Section]: EnhancedSectionInstance<SectionInfo<key>>
};
