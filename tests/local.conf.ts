/* eslint-disable @typescript-eslint/naming-convention */
// The naming convention for the configuration object doesn't match our project styling
// but the transpiled JS version of this is used as a config file for BrowserStack
// so we're beholden to their formatting in this case

import {
  Configuration,
} from "./config";

interface Services {
  seleniumServer?: {
    path: string;
  };
  chromedriver?: {
    path: string;
  };
  geckodriver?: {
    path: string;
  }
  edgedriver?: {
    path: string;
  }
}

const services = loadServices();

const directory = __dirname;

const nightwatchConfig: Configuration = {
  src_folders: [directory],
  page_objects_path: [directory + "/page_objects"],
  custom_assertions_path: [],
  disable_typescript: true,

  webdriver: {
    "start_process": true,
    "host": "127.0.0.1",
    "port": 9515,
    "server_path": services.chromedriver ? services.chromedriver.path : '',
    "cli_args": {
      "--log": "debug",
    }
  },

  globals_path: '',
  
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
      webdriver: {
        start_process: true,
        server_path: services.chromedriver ? services.chromedriver.path : '',
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
      webdriver: {
        start_process: true,
        port: 9515,
        server_path: services.chromedriver ? services.chromedriver.path : '',
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
      },
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: services.geckodriver ? services.geckodriver.path : '',
      },
    },
    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge'
      },
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: services.edgedriver ? services.edgedriver.path : '',
      }
    },
    // safari: {
    //   desiredCapabilities: {
    //     browserName: 'safari'
    //   }
    // },
    // opera: {
    //   desiredCapabilities: {
    //     browserName: 'opera'
    //   }
    // }
  }
};

module.exports = nightwatchConfig;
  
function loadServices(): Services {
  const s: Services = {};
  try {
    s.seleniumServer = require('selenium-server');
  } catch (err) { /* empty */ }

  try {
    s.chromedriver = require('chromedriver');
  } catch (err) { /* empty */ }

  try {
    s.geckodriver = require('geckodriver');
  } catch (err) { /* empty */ }

  try {
    s.edgedriver = require('edgedriver');
  } catch (err) { /* empty */ }
  return s;
}
  