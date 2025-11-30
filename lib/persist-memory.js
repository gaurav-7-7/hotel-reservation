let store = null;

function initStore() {
  if (store) return store;
  store = {
    rooms: null,
    bookings: []
  };
  return store;
}

function getStore() {
  if (!store) initStore();
  return store;
}

module.exports = { getStore, initStore };
