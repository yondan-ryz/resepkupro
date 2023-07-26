const DetailFood = {
  async render() {
    return `
      <div class="content">
        <div id="detailFood" class="detailFood"></div>
      </div>
    `;
  },

  async afterRender() {
    const url = window.location.hash.slice(1)
      .toLowerCase();
    const urlParams = url.split('/');
    const detailId = urlParams[2];

    const foodDetailContainer = document.querySelector('#detailFood');
    foodDetailContainer.innerHTML = '';

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailId}`);
      const responseJson = await response.json();
      const foodDetail = responseJson.meals[0];

      if (foodDetail) {
        /* eslint-disable no-use-before-define */
        foodDetailContainer.innerHTML = `
          <div class="detail-item">
                        <h2 class="content__heading">${foodDetail.strMeal}</h2>
                        <div class="hr-thin"></div>
            <div class="detail-item__header">
            <div class="container-detail clearfix">
    <div class="column">
     <img class="detail-item__header__poster" src="${foodDetail.strMealThumb}" alt="${foodDetail.strMeal}">
      <div class="hr-line-unhide"></div>
    </div>
    <div class="column">
     <div class="">
              <h3>Category:</h3>
              <p>${foodDetail.strCategory}</p>
              <h3>Area:</h3>
              <p>${foodDetail.strArea}</p>
              <h3>Tag:</h3>
              <p>${foodDetail.strTags}</p>
            </div>
            <div class="hr-line"></div>
              <h3>Receipt:</h3>
              <table class="resep">
                      <tbody>
                        <tr>
                          <td>${foodDetail.strIngredient1}</td>
                          <td>${foodDetail.strMeasure1}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient2}</td>
                          <td>${foodDetail.strMeasure2}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient3}</td>
                          <td>${foodDetail.strMeasure3}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient4}</td>
                          <td>${foodDetail.strMeasure4}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient5}</td>
                          <td>${foodDetail.strMeasure5}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient6}</td>
                          <td>${foodDetail.strMeasure6}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient7}</td>
                          <td>${foodDetail.strMeasure7}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient8}</td>
                          <td>${foodDetail.strMeasure8}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient9}</td>
                          <td>${foodDetail.strMeasure9}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient10}</td>
                          <td>${foodDetail.strMeasure10}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient11}</td>
                          <td>${foodDetail.strMeasure11}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient12}</td>
                          <td>${foodDetail.strMeasure12}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient13}</td>
                          <td>${foodDetail.strMeasure13}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient14}</td>
                          <td>${foodDetail.strMeasure14}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient15}</td>
                          <td>${foodDetail.strMeasure15}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient16}</td>
                          <td>${foodDetail.strMeasure16}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient17}</td>
                          <td>${foodDetail.strMeasure17}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient18}</td>
                          <td>${foodDetail.strMeasure18}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient19}</td>
                          <td>${foodDetail.strMeasure19}</td>
                        </tr>
                        <tr>
                          <td>${foodDetail.strIngredient20}</td>
                          <td>${foodDetail.strMeasure20}</td>
                        </tr>
                      </tbody>
                  </table>
    </div>
  </div>
             
            </div>
            <div class="hr-line"></div>
            <div class="detail-item__content">
              <br>
              <h3>instructions:</h3>
              <p>${foodDetail.strInstructions}</p>
              <h3>Video Youtube:</h3>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${getYouTubeVideoId(foodDetail.strYoutube)}" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
        `;
      } else {
        foodDetailContainer.innerHTML = '<p>Makanan tidak ditemukan.</p>';
      }
    } catch (error) {
      console.log('Error:', error);
      foodDetailContainer.innerHTML = `
      <div class="detail-item">
                        <h2 class="content__heading">Tidak bisa menampilkan detail</h2>
                        <div class="hr-thin"></div>
            <div class="detail-item__header">
              <img class="detail-item__error__image" src="./images/error.png" alt="error">
            </div>

          </div>`;
    }
  },
};

// Function to extract YouTube video ID from the URL
function getYouTubeVideoId(url) {
  const videoIdRegex = /(?:https?:\/\/(?:www\.)?)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/))([^&?/\s]+)/;
  const match = url.match(videoIdRegex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

export default DetailFood;
