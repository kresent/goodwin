let instance = null;

class CordovaApp {
  constructor() {
    if (instance) return instance;
    if (process.env.CORDOVA && typeof window !== 'undefined') this.initialize();
    instance = this;
    return instance;
  }

  ready = false;
  // splashscreenHidden = false;
  readyCallbacks = [];
  openUrlCallback = null;
  deepUrlCallbacksReady = false;
  deepUrlCallbacks = [];
  // Application Constructor
  initialize = () => {
    this.bindEvents();
  };
  // Bind any events that are required.
  // Usually you should subscribe on 'deviceready' event to know, when you can start calling cordova modules
  bindEvents = () => {
    window.document.addEventListener('deviceready', this.onDeviceReady, false);
  };
  // deviceready Event Handler
  onDeviceReady = () => {
    window.document.addEventListener('pause', this.checkForUpdate, false);
    window.document.addEventListener('hasFocus', this.checkForUpdate, false);
    this.checkForUpdate();
    window.screen.orientation &&
      window.screen.orientation.lock &&
      window.screen.orientation.lock('portrait');
    // Add click event listener for our update button.
    // We do this here, because at this point Cordova modules are initialized.
    // Before that chcp is undefined.
    // document.addEventListener("webkitvisibilitychange", this.checkForUpdate.bind(this), false);
    this.registerLinkClick();
    this.ready = true;
    this.runReadyCallbacks();
    window.addEventListener('native.keyboardshow', e =>
      // eslint-disable-next-line no-console
      console.info(e.keyboardHeight)
    );
    window.addEventListener('native.keyboardhide', e =>
      // eslint-disable-next-line no-console
      console.info(e.keyboardHeight)
    );
  };
  checkForUpdate = () => {};
  fetchUpdateCallback = error => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Failed to load the update with error code: ' + error.code);
      // eslint-disable-next-line no-console
      console.log(error.description);
    } else {
      // eslint-disable-next-line no-console
      console.log('Update is loaded');
    }
  };
  registerLinkClick = () => {
    window.document.addEventListener(
      'click',
      e => {
        const element = event.target;
        if (element.nodeName !== 'A') {
          return;
        }
        if (element.attr('data-href') === 'safari') {
          return;
        }
        // eslint-disable-next-line no-console
        console.info(element);
        if (!element.href.includes('tel:')) {
          window.cordova.InAppBrowser.open(element.href, '_blank');
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      },
      true
    );
  };
  runReadyCallbacks = () => {
    this.readyCallbacks.forEach(callback => callback());
  };
  runWhenReady = callback => {
    if (!this.ready) {
      return this.readyCallbacks.push(callback);
    }
    callback();
  };
  runDeepUrlCallbacks = url => {
    this.deepUrlCallbacks.forEach(callback => callback(url));
  };
  runWhenDeepUrlReady = callback => {
    if (!this.deepUrlCallbacksReady) {
      return this.deepUrlCallbacks.push(callback);
    }
    callback(this.deepUrl);
  };
  handleOpenURL = url => {
    const referrer = url;
    if (this.openUrlCallback) {
      this.openUrlCallback(referrer);
    } else {
      const interval = setInterval(() => {
        if (this.openUrlCallback) {
          this.openUrlCallback(referrer);
          clearInterval(interval);
        }
      }, 1000);
    }
  };
  setOpenUrlCallback = callback => {
    this.openUrlCallback = callback;
  };
}

export default new CordovaApp();
