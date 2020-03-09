import api from '~/services/api';

export const getItemsList = (url, items, resolve, reject) => {
  api
    .get(url)
    .then(response => {
      const retrived = items.concat(response.data.results);
      if (response.data.next !== null) {
        getItemsList(response.data.next, retrived, resolve, reject);
      } else {
        resolve(retrived);
      }
    })
    .catch(error => {
      console.log(error);
      reject('Something wrong. Please refresh the page and try again.');
    });
};

export const getItemsListPaginate = (url, items, resolve, reject) => {
  const page = url.split('page=')[1] - 1 || 0;
  if (page === 0) {
    items.total = 0;
    items.data = [];
  }
  api
    .get(url)
    .then(response => {
      items.data[page] = response.data.results;
      items.total += response.data.results.length;

      console.log(items);

      const retrived = items;
      if (response.data.next !== null) {
        getItemsListPaginate(response.data.next, retrived, resolve, reject);
      } else {
        resolve(retrived);
      }
    })
    .catch(error => {
      console.log(error);
      reject('Something wrong. Please refresh the page and try again.');
    });
};
