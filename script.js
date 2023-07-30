'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navLinks = document.querySelector('.nav__links');
const operationButtons = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const infoBox = document.querySelectorAll('.operations__content');
const navBar = document.querySelector('.nav');


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// here we have used the concept of event capturing and bubbling
navLinks.addEventListener('click',(e) => {
   e.preventDefault();
  let isNavLink =  e.target.classList.contains('nav__link');
  if(isNavLink){
      document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  }
});


// here we have used the concept of event capturing and bubbling
operationButtons.addEventListener('click',(e) => {
   let clicked =  e.target.closest('.operations__tab');
   if(!clicked) return;
   tabs.forEach((each) => {
       each.classList.remove('operations__tab--active')
   });
   e.target.classList.add('operations__tab--active');
   let activateTab =  e.target.getAttribute('data-tab');

   infoBox.forEach((each) => {
    each.classList.remove('operations__content--active');
  });
   document.querySelector(`.operations__content--${activateTab}`)
   .classList.add('operations__content--active');
});


// implementing nav bar hovering effect
function handleHover (e){
   if(e.target.classList.contains('nav__link')){
     let imgLogo = document.getElementById('logo');
     document.querySelectorAll('.nav__link').forEach(each => {
         if(each !== e.target)
            each.style.opacity = this;
     });
     imgLogo.style.opacity = this;
   }
}

navBar.addEventListener('mouseover',handleHover.bind(0.5));

navBar.addEventListener('mouseout',handleHover.bind(1));


// Implementing stick nav bar 

let navHeight = navBar.getBoundingClientRect().height; 

const obsCallback = (entries) => {
    const [entry] = entries;
    if(!entry.isIntersecting)
      navBar.classList.add('sticky')
    else 
      navBar.classList.remove('sticky')
}

const headerElement = document.querySelector('.header');
const headerObserver =  new IntersectionObserver(obsCallback,{
  root : null,
  threshold : 0,
  rootMargin : `-${navHeight}px`
});
headerObserver.observe(headerElement);


// Implementing revealing section on page
let allSections = document.querySelectorAll('.section');

const revealSection = (entries,observer) => {
  const[entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const revealObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15
});

allSections.forEach(each => {
   revealObserver.observe(each);
   each.classList.add('section--hidden');
})


