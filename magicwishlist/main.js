let wishlist = [];
let submit = document.querySelector('.submitbutton');
// Search Button functionality
submit.addEventListener('click', function() {
  document.querySelector('.wishList').innerHTML = '';
  document.querySelector('.wishListTitle').innerHTML = '';
  document.querySelector('.container').innerHTML = '';
  let input = document.querySelector('.searchword');
  console.log(input.value);
  greaterSearch(input.value);
  // greaterSearch(input.value); //calls our better search
  input.value = '';
})

//print button functionality /selfcontained/
let printWish = document.querySelector('.listPrint'); //assign variable to our print list button
printWish.addEventListener('click', function() { //add event listener
  document.querySelector('.container').innerHTML = ''; //make our search return container empty
  let thelist = document.querySelector('.wishList'); //grab the wishlist ol
  thelist.innerHTML = '';  //make wishlist ol empty
  let wishListTitle = document.querySelector('.wishListTitle'); //grab the wishlist title div
  wishListTitle.innerHTML = `<h1>Wish List</h1>` //populate the wishlist title div with an h1
  wishlist.forEach(function(e) { //run through everything we've added to our wishlist array and make a new list item with picture/price
    let listItem = document.createElement('li');
    let cardinfo = `
          <hr>
          <img src=${e.image_uri}>
          <p>Dollars: ${e.usd} | Tix: ${e.tix}</p>`
    listItem.innerHTML = cardinfo;
    // console.log(listItem)
    // console.log(thelist)
    thelist.appendChild(listItem);
  })
})

//check budget button functionality /calls our checking budget function
let checkbudget = document.querySelector(".checkbudget"); //assign variable to the button
checkbudget.addEventListener('click', function() { //add event listener to the button
  let input = document.querySelector('.budgetnum'); //assign a variable to the value of what's in the budget num input
  // console.log(input.value);
  checkingbudget(input.value, wishlist); //run check budget function
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
        // console.log(response.status);
        return;
      }
      return response.json();
    }).then(function(catalog) {
      // console.log(catalog);
      catalog.data.forEach(function(e) {
        fetch("https://api.scryfall.com/cards/named?exact=" + fuzzify(e) + "&format=json")
          .then(function(response) {
            if (response.status !== 200) {
              // console.log(response.status);
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
              // console.log(wishlist);
            });

          })
      })
    })
}
