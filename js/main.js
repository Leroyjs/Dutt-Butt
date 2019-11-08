"use strict";

let html = document.documentElement;
let burger = document.querySelector('.menu-btn');
let mainNav = document.querySelector('#main-nav');
let subNav = document.querySelector('#sub-nav');
let order = document.querySelector('#order');
let logoPath = document.querySelectorAll('.logo path');
let logo = document.querySelector('.logo');
let social = document.querySelector('#social');
let body = document.querySelector('body');
let footer = document.querySelector('footer');
let parallax = document.querySelector('.parallax');
let aNav = document.querySelectorAll('nav a, #order');
let img = document.querySelectorAll('.perspective-card');
let appearBlock = document.querySelectorAll('.appear');

burger.onclick = function(){
	this.classList.toggle('menu-btn_active');
	order.classList.toggle('order-active');
	subNav.classList.toggle('nav_active');
	mainNav.classList.toggle('nav_active');
	logo.classList.toggle('logo-active');
	social.classList.toggle('social-active');
	body.classList.toggle('bodyScroll');
	footer.classList.toggle('footer-active');
	for(let i=0; i<logoPath.length; i++) logoPath[i].classList.toggle('logo-active');
}

for (let i = 0; i < aNav.length; i++){
	aNav[i].onclick = function(){
		burger.classList.remove('menu-btn_active');
		order.classList.remove('order-active');
		subNav.classList.remove('nav_active');
		mainNav.classList.remove('nav_active');
		logo.classList.remove('logo-active');
		social.classList.remove('social-active');
		body.classList.remove('bodyScroll');
		footer.classList.remove('footer-active');
		for(let i=0; i<logoPath.length; i++) logoPath[i].classList.remove('logo-active');
	}
}

window.addEventListener('scroll', function() {
	let styleParallax = getComputedStyle(parallax);
	let heightParallax = styleParallax.height;
	heightParallax = heightParallax.substring(0, heightParallax.length - 2);
	let vh = html.clientHeight;
	let topParallax = vh - heightParallax;
	parallax.style.top = topParallax + 'px';
});


const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
      animationTime = 500,
      framesCount = 70;

anchors.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
    let scroller = setInterval(function() {
      let scrollBy = coordY / framesCount;
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        window.scrollBy(0, scrollBy);
      } else {
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    }, animationTime / framesCount);
  });
});



for(let i=0; i<img.length; i++){
    img[i].onmouseover = img[i].onmousemove = rotatePicture;
    img[i].onmouseout = returnPicture;
}


function rotatePicture(event){
    let computedStyle = getComputedStyle(this);
    let x = event.offsetX;
    let y = event.offsetY;
    let heighImg = computedStyle.height.substring(0, computedStyle.height.length - 2);
    let widthImg = computedStyle.width.substring(0, computedStyle.width.length - 2);
    let angleX = -(10 - 20*x/widthImg);
    let angleY = (7 - 14*y/heighImg);
    this.style.transform = 'rotateX('+angleY+'deg) rotateY('+angleX+'deg) translateZ(0px)';
}
function returnPicture(event){
    this.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
}

for (let i = 0; i < appearBlock.length; i++){
	appearBlock[i].style.opacity = '0';
	appearBlock[i].style.transition = '1s';
	window.addEventListener('scroll', function() {
		let appearTop = appearBlock[i].getBoundingClientRect();
		let vh = html.clientHeight;
		let appearValue = appearTop.top - vh*0.85;
		if (appearValue <= 0) 	appearBlock[i].style.opacity = '1';
	});
}
