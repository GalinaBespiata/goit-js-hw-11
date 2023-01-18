import axios from 'axios';

export class PixabeyApi {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '32908918-e7cc5cba0888a51be5caa34d0';
  constructor() {
    this.page = 1;
    this.keyWord = null;
  }

  async getrequest() {
    const serchByParams = new URLSearchParams({
         q:this.keyWord,
        image_type:"photo",
        orientation:"horizontal",
        safesearch:true,
        page: this.page,
        per_page:40,
        key: PixabeyApi.API_KEY,
    })
    const response = await fetch(
        `${PixabeyApi.BASE_URL}?${serchByParams.toString()}`
      );
    // const response = await fetch(
    //   `${PixabeyApi.BASE_URL}?key=${PixabeyApi.API_KEY}&q=${this.keyWord}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    // );
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  }
}

// export function getrequest(keyWord) {
//     return fetch(
//       `https://pixabay.com/api/?key=32908918-e7cc5cba0888a51be5caa34d0&q=${keyWord}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
//     ).then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     });
//   }
