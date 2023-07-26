const TheMealDbSource = {
  async searchMealByName(keyword) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
    const responseJson = await response.json();
    return responseJson.meals;
  },
};

const createFoodItemTemplate = (food) => `
  <div class="food-item">
    <div class="food-item__header">
      <img class="food-item__header__poster" src="${food.strMealThumb}" alt="${food.strMeal}">
      <div class="food-item__header__floating">
        <p>⭐️<span class="food-item__header__floating__text">${food.strCategory}</span></p>
      </div>
    </div>
    <div class="food-item__content">
      <h3><a href="/#/detail/${food.idMeal}">${food.strMeal}</a></h3>
    </div>
  </div>
`;

const ListFood = {
  async render() {
    return `
    <div class="hero">
    <div class="hero__inner">
      <h1 class="hero__title">Welcome to ResepKU</h1>
      <p class="hero__tagline">"provide your comfort in finding the best taste"</p>
    </div>
  </div>

  <div class="content"> 
  <article class="headline">
  <figure class="headline__figure">
    <img src="images/headline.png" alt="Dicoding Fact Sheet">
  </figure>
  <div class="headline__content">
  <h2>Article</h2>
  <p>Kami adalah sebuah platform online yang menyediakan kumpulan resep makanan yang beragam dan menginspirasi. Kami percaya bahwa memasak adalah
   seni yang menyenangkan dan bisa dinikmati oleh siapa pun, baik pemula maupun ahli masak.<span id="dots">...</span><span id="more"> Kami selalu berusaha untuk menjaga kualitas resep yang kami tampilkan. Tim kami bekerja sama dengan para ahli masak untuk memastikan setiap resep diuji dan dikurasi dengan cermat. Kami juga selalu terbuka untuk menerima sumbangan resep dari pengguna kami,
    sehingga kita dapat saling berbagi pengetahuan dan pengalaman dalam dunia memasak.
   Terima kasih telah bergabung dengan kami di Resepku. Kami berharap Anda menemukan inspirasi dan kesenangan dalam mengeksplorasi resep-resep yang kami sajikan.
   Mulailah petualangan kuliner Anda sekarang dan jadilah koki di dapur Anda sendiri!</span></p>
  <button onclick="myFunction()" id="myBtn" class="headline__button">Read more</button>
  </div>
</article>
</div>

<div class="box">
<img src="images/fish.png">
<h4 class="atasKiri">You Can Find Cooking Ideas Every Day With The Best Selection of Recipes</h4>
</div>
      <div class="content">
      <div class="content__heading"> <h1>Find Your Resep Today</h1>
      <h3>Happy Cooking!</h3></div>
            <div class="hr-thin"></div>
        <div class="search-container">
          <input type="text" id="searchInput" class="search-input" placeholder="Search Foods">
          <button id="searchButton" class="search-button"><i class="fa fa-search" aria-hidden="true"></i></button>
        </div>
        <div id="searchMessage" class="search-message"></div>
        <div id="foods" class="foods"></div>  
      </div>
    `;
  },

  async afterRender() {
    const foodsContainer = document.querySelector('#foods');
    const searchButton = document.querySelector('#searchButton');
    const searchInput = document.querySelector('#searchInput');
    const searchMessage = document.querySelector('#searchMessage');

    const renderFoods = async (foods) => {
      foodsContainer.innerHTML = '';

      if (foods === null) {
        searchMessage.innerHTML = '';
      } else if (foods.length > 0) {
        foods.forEach((food) => {
          foodsContainer.innerHTML += createFoodItemTemplate(food);
        });
      }

      if (searchMessage) {
        searchMessage.innerHTML = '';
      }
    };

    const searchFoods = async () => {
      const searchQuery = searchInput.value;
      if (searchQuery.trim() !== '') {
        try {
          // eslint-disable-next-line no-useless-concat
          searchMessage.innerHTML = 'Mencari makanan...' + '<br><img class="image-search-message" src="./images/loader.gif" alt="">';
          const foods = await TheMealDbSource.searchMealByName(searchQuery);
          renderFoods(foods);

          if (foods === null || foods.length === 0) {
            // eslint-disable-next-line no-useless-concat
            searchMessage.innerHTML = `Makanan "${searchQuery}" tidak ditemukan` + '<br><img class="image-notfound" src="./images/notfound.png" alt="">';
          } else {
            searchMessage.innerHTML = `Menampilkan pencarian dari kata kunci: "${searchQuery}"`;
          }
        } catch (error) {
          console.error(error);
          // eslint-disable-next-line no-useless-concat
          searchMessage.innerHTML = 'Tidak bisa memuat data' + '<br><img class="image-notfound" src="./images/error.png" alt="">';
        }
      } else {
        searchMessage.innerHTML = 'Masukan kata kunci terlebih dahulu';
      }
    };

    searchButton.addEventListener('click', searchFoods);

    searchInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        searchFoods();
      }
    });

    renderFoods([]);
  },
};

export default ListFood;
