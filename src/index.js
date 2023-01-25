const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

const breedUrl = "https://dog.ceo/api/breeds/list/all";

const dogContainer = document.getElementById("dog-image-container");

const breedList = document.getElementById("dog-breeds");

const selectElement = document.getElementById("breed-dropdown");

const renderBreeds = (list) => {
  list.forEach((breed) => {
    const breedElement = document.createElement("li");
    breedElement.textContent = breed;
    breedList.append(breedElement);
    breedElement.addEventListener("click", (event) => {
      event.target.style = "color: green";
    });
  });
};

fetch(imgUrl)
  .then((response) => response.json())
  .then((data) => {
    data.message.forEach((dataUrl) => {
      const imageElement = document.createElement("img");
      imageElement.src = dataUrl;
      dogContainer.append(imageElement);
    });
  });

fetch(breedUrl)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    const dataList = Object.keys(data.message);

    selectElement.addEventListener("change", (event) => {
      const newList = dataList.filter((breed) =>
        breed.startsWith(event.target.value),
      );
      const liElements = document.getElementsByTagName("li");
      Array.from(liElements).forEach((item) => {
        item.remove();
      });
      renderBreeds(newList);
      console.log(newList);
    });

    renderBreeds(dataList);

    // for (const key in dataObj) {
    //   const breedElement = document.createElement("li");
    //   breedElement.textContent = key;
    //   breedList.append(breedElement);
    //   breedElement.addEventListener("click", (event) => {
    //     event.target.style = "color: green";
    //   });
    // }
  });
