

let wishlist = [];
let submit = document.querySelector('.submitbutton');
submit.addEventListener('click', function(){
  document.querySelector('.container').innerHTML = '';
  let input = document.querySelector('.searchword');
  console.log(input.value);
  searching(input.value);
  input.value = '';
})

let printWish = document.querySelector('.listPrint');
printWish.addEventListener('click', function(){
  wishlist.forEach(function(e){
    let thelist = document.querySelector('.wishList');
    let listItem = document.createElement('li');
    listItem.innerHTML = e.name;
    console.log(listItem)
    console.log(thelist)
    thelist.appendChild(listItem);

  })
})

function searching(input){
  let card = fuzzify(input);
fetch("https://api.scryfall.com/cards/named?fuzzy=" + card + "&format=json")
  .then(
    function(response){
    if(response.status !== 200){
      console.log(response.status);
      return;
    }
    return response.json();

  }).then(function(data){
    console.log(data);
    let newCard = document.createElement('div');
    newCard.className="fetchedCards";
    document.querySelector('.container').appendChild(newCard);
    let cardinfo = `
    <img src=${data.image_uri}>
    <p>Dollars: ${data.usd} | Tix: ${data.tix}</p>`
    newCard.innerHTML= cardinfo;
    let saveButton = document.createElement('button');
    newCard.appendChild(saveButton);
    saveButton.innerHTML = "Save Me For Later!";
    saveButton.className="saveButton";
    saveButton.addEventListener('click', function(){
      wishlist.push(data);
      saveButton.innerHTML = "You Saved This Card!";
      console.log(wishlist);
    });

  });
}
function fuzzify(input){
  let betterinput = input.replace(/ /i,"+");
  return betterinput;

}
//13, 18, 12, 12, 13, 7
