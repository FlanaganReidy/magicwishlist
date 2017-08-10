


let submit = document.querySelector('.submitbutton');
submit.addEventListener('click', function(){
  document.querySelector('.container').innerHTML = '';
  let input = document.querySelector('.searchword');
  console.log(input.value);
  searching(input.value);
  input.value = '';
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
    // let cardimage = document.createElement('img');
    // cardimage.setAttribute('src',data.image_uri);
    // newCard.appendChild(cardimage);
    document.querySelector('.container').appendChild(newCard);
    let cardinfo = `
    <img src=${data.image_uri}>
    <p>Dollars: ${data.usd}| Tix: ${data.tix}</p>`
    newCard.innerHTML= cardinfo;

  });
}
function fuzzify(input){
  let betterinput = input.replace(/ /i,"+");
  return betterinput;

}
//13, 18, 12, 12, 13, 7
