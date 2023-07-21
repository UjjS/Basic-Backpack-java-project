/**
 * Event listeners
 * @link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * @link https://developer.mozilla.org/en-US/docs/Web/Events
 */
import backpackObjectArray from './Components/data.js';
import './style.css';

function newStrap(strap_arr)
{
  strap_arr.forEach((strap)=>
  {
    // It gets this backpack.Straplength.left and backpack.Straplength.right
    let side = strap.querySelector(".data-side")
    const strap_form= document.createElement('form');
    strap_form.classList.add(`${side}length`);
    strap_form.innerHTML=`
    <input type="number" name=${side}Length placeholder="Enter the ${side}Length">
    <button>Update</button>
    `;
    strap_form.addEventListener('submit',(e)=>
    
    {
      e.preventDefault();
      // Put the input inside inplace of the backpack.Straplength.left and backpack.Straplength.right
      let new_val=strap_form.querySelector('input').value
      strap.querySelector('span').innerHTML=`${new_val}Inches`
      // Clear the input field after it is done , Same as =""
      strap_form.reset()
      
      


    })
    strap.append(strap_form)
  })
}

const lidToggle = function () {
  // Find the current backpack object in backpackObjectArray
  let backpackObject = backpackObjectArray.find(
    ({id}) => id === this.parentElement.id
  );
  // The this keyword here is for the button object
  // Toggle lidOpen status
  //{id} is Object destructing from both the objects EverydayBackpack and FrogBack
  backpackObject.lidOpen == true
    ? (backpackObject.lidOpen = false)
    : (backpackObject.lidOpen = true);

  // Toggle button text
  this.innerText == 'Open lid'
    ? (this.innerText = 'Close lid')
    : (this.innerText = 'Open lid');

  // Set visible property status text
  let status = this.parentElement.querySelector('.backpack__lid span');
  status.innerText == 'closed'
    ? (status.innerText = 'open')
    : (status.innerText = 'closed');
};
const backpackList = backpackObjectArray.map((backpack) => {
  let backpackArticle = document.createElement('article');
  backpackArticle.classList.add('backpack');
  backpackArticle.setAttribute('id', backpack.id);
  // Creating a form with to take strap length
  
  

  backpackArticle.innerHTML = `
     <figure class="backpack__image">
       <img src=${backpack.image} alt="" loading="lazy" />
     </figure>
     <h1 class="backpack__name">${backpack.name}</h1>
     <ul class="backpack__features">
       <li class="feature backpack__volume">Volume:<span> ${
         backpack.volume
       }l</span></li>
       <li class="feature backpack__color">Color:<span> ${
         backpack.color
       }</span></li>
       <li class="feature backpack__age">Age:<span> ${backpack.backpackAge()} days old</span></li>
       <li class="feature backpack__pockets">Number of pockets:<span> ${
         backpack.pocketNum
       }</span></li>
       <li class="feature backpack__strap" data-side="left">Left strap length:<span> ${
         backpack.strapLength.left
       } inches</span></li>
       <li class="feature backpack__strap" data-side="left">Right strap length:<span> ${
         backpack.strapLength.right
       } inches</span></li>
       <li class="feature backpack__lid">Lid status: <span>${
         backpack.lidOpen ? 'open' : 'closed'
       }</span></li>
     </ul>
     <button class="lid-toggle">Open lid</button>
   `;
  
  const button = backpackArticle.querySelector('.lid-toggle');
  let strap_Arr = backpackArticle.querySelectorAll('.backpack__strap')
  newStrap(strap_Arr)
  
  button.addEventListener('click', lidToggle);

  button.addEventListener('mouseenter', () => {
    console.log('Hello world');
    button.classList.toggle('blue');
  });

  return backpackArticle;
});



const main = document.querySelector('.maincontent');
backpackList.forEach((backpack) => {
  main.append(backpack);
});
