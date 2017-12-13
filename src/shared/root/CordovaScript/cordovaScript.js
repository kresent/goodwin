(function() {
  const apartmentRegExp = /\/\d+/;

  function loadFromLocalStorage(key, json) {
    try {
      const serialized = localStorage.getItem(key);

      if (serialized === null) {
        return undefined;
      }

      if (json) {
        return JSON.parse(serialized);
      }
      return serialized;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Ошибка localStorage API:', e.message || '');
      return undefined;
    }
  }

  function saveToLocalStorage(key, value, json) {
    try {
      if (json) {
        value = JSON.stringify(value);
      }

      localStorage.setItem(key, value);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Ошибка localStorage API:', e.message || '');
    }
  }

  function generateUuid() {
    let uuid = '',
      i,
      random;
    for (i = 0; i < 32; i++) {
      random = (Math.random() * 16) | 0;

      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(
        16
      );
    }
    return uuid;
  }

  function getUuid() {
    let uuid;

    if (!!loadFromLocalStorage('ha.persistent.uuid')) {
      uuid = loadFromLocalStorage('ha.persistent.uuid');
    } else {
      uuid = generateUuid();
      saveToLocalStorage('ha.persistent.uuid', uuid);
    }
    return uuid;
  }

  function isAuthenticated() {
    return !!loadFromLocalStorage('ha.uid');
  }

  function fetchUpdateCallback() {}

  function installationCallback() {}

  let isDeviceReady = false;
  let deviceReadyCallbacks = [];

  document.addEventListener(
    'deviceready',
    () => {
      isDeviceReady = true;
      for (let i = 0; i < deviceReadyCallbacks.length; i++) {
        deviceReadyCallbacks[i]();
      }
      deviceReadyCallbacks = [];

      // eslint-disable-next-line no-undef
      universalLinks.subscribe(null, function(eventData) {
        if (!isAuthenticated()) return;

        if (eventData && eventData.path) {
          const apartmentId = eventData.path.match(apartmentRegExp);
          if (!!apartmentId) {
            window.location.hash = `#/mobile/map${apartmentId[0]}`;
          }
        }
      });

      // eslint-disable-next-line no-undef
      Branch.initSession(function() {});

      var userId = getUuid();
      // eslint-disable-next-line no-undef
      Branch.setIdentity(userId);
    },
    false
  );
})();
