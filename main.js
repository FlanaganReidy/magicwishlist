let wishlist = [];
let submit = document.querySelector('.submitbutton');
submit.addEventListener('click', function() {
  document.querySelector('.container').innerHTML = '';
  let input = document.querySelector('.searchword');
  console.log(input.value);
  greaterSearch(input.value);
  input.value = '';
})

let printWish = document.querySelector('.listPrint');
printWish.addEventListener('click', function() {
  document.querySelector('.container').innerHTML = '';
  let thelist = document.querySelector('.wishList');
  thelist.innerHTML = '';
  let wishListTitle = document.querySelector('.wishListTitle');
  wishListTitle.innerHTML = `<h1>Wish List</h1>`
  wishlist.forEach(function(e) {
    let listItem = document.createElement('li');
    let cardinfo = `
          <hr>
          <img src=${e.image_uri}>
          <p>Dollars: ${e.usd} | Tix: ${e.tix}</p>`
    listItem.innerHTML = cardinfo;
    console.log(listItem)
    console.log(thelist)
    thelist.appendChild(listItem);

  })
})
let checkbudget = document.querySelector(".checkbudget");
checkbudget.addEventListener('click', function() {
  let input = document.querySelector('.budgetnum');
  console.log(input.value);
  checkingbudget(input.value, wishlist);
})

// function searching(input) {
//   let card = fuzzify(input);
//   fetch("https://api.scryfall.com/cards/named?fuzzy=" + card + "&format=json")
//     .then(
//       function(response) {
//         if (response.status !== 200) {
//           if (response.status === 404) {
//             let thebody = document.querySelector(".container");
//             thebody.innerHTML = `<p>Either not a card or too many cards. Try again, and please, be a little more specific.</p>`
//           }
//           console.log(response.status);
//           return;
//         }
//         return response.json();
//
//       }).then(function(data) {
//       console.log(data);
//       let newCard = document.createElement('div');
//       newCard.className = "fetchedCards";
//       document.querySelector('.container').appendChild(newCard);
//       let cardinfo = `
//     <img src=${data.image_uri}>
//     <p>Dollars: ${data.usd} | Tix: ${data.tix}</p>`
//       newCard.innerHTML = cardinfo;
//       let saveButton = document.createElement('button');
//       newCard.appendChild(saveButton);
//       saveButton.innerHTML = "Save Me For Later!";
//       saveButton.className = "saveButton";
//       saveButton.addEventListener('click', function() {
//         wishlist.push(data);
//         saveButton.innerHTML = "You Saved This Card!";
//         console.log(wishlist);
//       });
//
//     });
// }

function fuzzify(input) {
  let betterinput = input.replace(/ /i, "+");
  return betterinput;

}

function checkingbudget(budget, wishlist) {
  let underBudgetList = document.querySelector('.underBudgetList');
  underBudgetList.innerHTML = '';
  let underbudget = [];
  let underBudgetTitle = document.querySelector('.underBudgetTitle');
  underBudgetTitle.innerHTML = `<h1>Under Budget List</h1>`
  wishlist.forEach(function(e) {
    if (parseFloat(e.usd) <= budget) {
      underbudget.push(e);
      let listItem = document.createElement('li');
      listItem.innerHTML = e.name;
      underBudgetList.appendChild(listItem);
    }
  })

}

function greaterSearch(input) {
  fetch("https://api.scryfall.com/cards/autocomplete?q=" + fuzzify(input))
    .then(function(response) {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
      return response.json();
    }).then(function(data) {
      console.log(data);
      data.data.forEach(function(e) {
        fetch("https://api.scryfall.com/cards/named?fuzzy=" + fuzzify(e) + "&format=json")
          .then(function(response) {
            if (response.status !== 200) {
              console.log(response.status);
              return;
            }
            return response.json();
          }).then(function(data) {
            console.log(data);
            let newCard = document.createElement('div');
            newCard.className = "fetchedCards";
            document.querySelector('.container').appendChild(newCard);
            let cardinfo = `
                  <hr>
                  <img src=${data.image_uri}>
                  <p>Dollars: ${data.usd} | Tix: ${data.tix}</p>`
            newCard.innerHTML = cardinfo;
            let saveButton = document.createElement('button');
            newCard.appendChild(saveButton);
            saveButton.innerHTML = "Save Me For Later!";
            saveButton.className = "saveButton";
            saveButton.addEventListener('click', function() {
              wishlist.push(data);
              saveButton.innerHTML = "You Saved This Card!";
              console.log(wishlist);
            });

          })
      })
    })
}
