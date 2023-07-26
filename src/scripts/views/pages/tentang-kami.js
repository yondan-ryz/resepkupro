const createDeveloperItemTemplate = (developer) => `
  <div class="dev-item">
    <div class="dev-item__header">
      <img class="dev-item__header__poster cl" src="${developer.photo}" alt="${developer.name}">
    </div>
    <div class="dev-item__content">
      <h3 style="text-align: center" class="no-copy">${developer.name}</h3>
      <div class="hr-line"></div>
      <p class="no-copy">${developer.university}</p>
    </div>
  </div>
`;

const AboutUs = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">About Us</h2>
            <div class="hr-thin"></div>
        <div id="devs" class="devs">
          ${this.generateDeveloperItems()}
        </div>  
      </div>
    `;
  },

  async afterRender() {
    // Tidak ada fitur pencarian
  },

  generateDeveloperItems() {
    const developers = [
      { name: 'Yonathan Dani Kristiawan', photo: './images/dev/yonathan.png', university: 'Universitas Kristen Immanuel Yogyakarta' },
      { name: 'Katralin', photo: './images/dev/katralin.png', university: 'Politeknik Negeri Sriwijaya' },
      { name: 'Abdul Majid Musthofa', photo: './images/dev/majid.png', university: 'Universitas Islam Sultan Agung Semarang' },
      { name: 'Natan Enggal Swasono', photo: './images/dev/natan.png', university: 'Universitas Kristen Immanuel Yogyakarta' },
    ];

    let developerItems = '';
    developers.forEach((developer) => {
      developerItems += createDeveloperItemTemplate(developer);
    });

    return developerItems;
  },
};

export default AboutUs;
