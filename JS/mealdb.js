document.getElementById('error-message').style.display = 'none';
const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    //clear Data
    searchField.value = '';

    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';

    }
    else {

        document.getElementById('error-message').style.display = 'none';
        
        //load Data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

        // console.log(url);

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => displayError(error));
    }

}

const displayError = error => {

    document.getElementById('error-message').style.display = 'block';
}



const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (meals.length == 0) {
        //
    }
    meals.forEach(meal => {
        // console.log(meal);


        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                </div>
            </div>

        `;
        searchResult.appendChild(div);
    })
}

const loadMealDetail = mealId => {
    // console.log(mealId);

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountryDetail(data.meals[0]));

}

const displayCountryDetail = meal => {
    console.log(meal);
    const MealDetails = document.getElementById('meal-details')
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
          <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    
    `;
    MealDetails.appendChild(div);
}