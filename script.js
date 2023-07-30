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