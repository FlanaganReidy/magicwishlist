let wishlist = [];
let submit = document.querySelector('.submitbutton');
// Search Button functionality
submit.addEventListener('click', function() {
  document.querySelector('.wishList').innerHTML = '';
  document.querySelector('.wishListTitle').innerHTML = '';
  document.querySelector('.container').innerHTML = '';
  let input = document.querySelector('.searchword');
  console.log(input.value);
  greaterSearch(input.value).then();
  // greaterSearch(input.value); //calls our better search
  input.value = '';
})

function fuzzify(input) {
  let betterinput = input.replace(/ /i, "+");
  return betterinput;

}

async function greaterSearch(input) {
  try{
  let response = await fetch("https://api.scryfall.com/cards/search?q=" + fuzzify(input), {type:"GET"})
  let data = await response.json();
  }
  catch(error){
    console.error(error);
  }
  console.log(data.data);

  data.data.forEach( (data)=> {

  let newCard = document.createElement('div');
        newCard.className = "fetchedCards";
        document.querySelector('.container').appendChild(newCard);
        let cardinfo = `
            <hr>
            <img src=${data.image_uris.normal}>
            <p>Dollars: ${data.prices.usd} | Tix: ${data.prices.tix}</p>`
        newCard.innerHTML = cardinfo;
        let saveButton = document.createElement('button');
        newCard.appendChild(saveButton);
        saveButton.innerHTML = "Save Me For Later!";
        saveButton.className = "saveButton";
        saveButton.addEventListener('click', function() {
          wishlist.push(data);
          saveButton.innerHTML = "You Saved This Card!";
          // console.log(wishlist);
    });
    }
  )
}