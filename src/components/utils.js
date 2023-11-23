const nada = () => {};

const clearCart = (callback = nada) => {
  // Open IndexedDB
  const openRequest = window.indexedDB.open('quoteCartDB', 1);

  openRequest.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(['quoteCart'], 'readwrite');
    const quoteCartStore = transaction.objectStore('quoteCart');

    const clearRequest = quoteCartStore.clear();

    clearRequest.onsuccess = function () {
      callback();
    };

    transaction.oncomplete = function () {
      db.close();
    };
  };

  openRequest.onerror = function (error) {
    console.error('Error opening IndexedDB:', error);
  };
};

export default clearCart;
