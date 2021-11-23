// input form
formElement = document.getElementById('form-login');
liElement = document.getElementById('user-login');
liElement.onclick = function() {
    formElement.classList.toggle('flex');
}
buttonElement = document.getElementById('btn-out');
buttonElement.onclick = function () {
    formElement.classList.remove('flex');
}
// Menu 
btnMenu = document.getElementById('nav-menu');
listElement = document.getElementById('listMenu');
itemElements = listElement.querySelectorAll('li a');
btnMenu.onclick = function() {
    if (bodyWidth.scrollWidth < 723 || bodyWidth.scrollWidth >= 724 && bodyWidth.scrollWidth <= 1024) {
        let navItems = document.getElementsByClassName('nav-item');
        for (let navItem of navItems) {
            navItem.classList.toggle('block-none');
        }
    }
    if (listElement.style.maxHeight) {
        listElement.style.maxHeight = null;
    }
    else {
        itemElements[0].innerHTML='HOME';
        itemElements[1].innerHTML='ABOUT';
        itemElements[2].innerHTML='WHAT WE OFFER';
        itemElements[3].innerHTML='CONTACT';
       listElement.style.maxHeight =listElement.scrollHeight + 'px';
    }
}
// Search
searchElement = document.getElementById('search__btn');
blockSearchElement = document.getElementById('search');
searchElement.onclick = function(e) {
    e.preventDefault();
    blockSearchElement.classList.add('search__show');
}
closeElement = document.getElementById('close');
closeElement.onclick = function(e) {
    e.preventDefault();
    blockSearchElement.classList.remove('search__show');
}
// scroolWidth
const bodyWidth = document.querySelector('body');
if (bodyWidth.scrollWidth > 1023 ) {
    let navItems = document.getElementsByClassName('nav-item');
    for (let navItem of navItems) {
        navItem.classList.remove('block-none');
    }
    itemElements[0].innerHTML='HOME';
    itemElements[1].innerHTML='ABOUT';
    itemElements[2].innerHTML='WHAT WE OFFER';
    itemElements[3].innerHTML='CONTACT';
}
// form-contact
const formElements = document.getElementsByClassName('form__contact');
for ( let element of formElements) {
    if (bodyWidth.scrollWidth >= 768 && bodyWidth.scrollWidth <= 992 ) {
        element.classList.remove('col-sm');
        element.classList.add('col-sm-6');
    }
}
// slideShow 
let slideIndex = 0;
slideShow();
function slideShow() {
    const caurosels = document.getElementsByClassName('caurosel');
    for (let caurosel of caurosels) {
        caurosel.style.display = 'none';
    }
    slideIndex++;
    if (slideIndex  > caurosels.length) { slideIndex = 1};
    caurosels[slideIndex - 1].style.display = 'block';
    setTimeout(slideShow, 5000); 
}
// LIST ABOUT
// let listIndex = 0;
// listShow();
// function listShow() {
//     const block8Body = document.getElementById('block-8');
//     const block8Elements = block8Body.getElementsByClassName('block-8__list');
//     const dots = document.getElementsByClassName('block-8__icon');
//     for (let block8Element of block8Elements) {
//         block8Element.style.display = 'none';
//     }
//     listIndex++;
//     if (listIndex  > block8Elements.length) { listIndex = 1};
//     for (let dot of dots) {
//         dot.className = dot.className.replace(' active-block-8', "");
//     }
//     block8Elements[listIndex - 1].style.display = 'flex';
//     dots[listIndex - 1].style.className += ' active-block-8';
//     setTimeout(listShow, 5000); 
// }
// VIDEO SHOW 
const videoElement =document.querySelector('.bg-video');
const showVideo = document.getElementById('showVideo');
    showVideo.onclick = function (e) {
        e.preventDefault();
        videoElement.classList.add('video-show');
    }
const closeVideo = document.getElementById('closeVideo');
    closeVideo.onclick = function () {
        closeVideo.parentElement.classList.remove('video-show')
    }