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
