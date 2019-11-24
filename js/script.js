/******************************************
FSJS project 2 - List Filter and Pagination
******************************************/
const list = document.querySelectorAll('li.student-item');
const pageDiv = document.querySelector('div.page');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
pageDiv.firstElementChild.appendChild(searchDiv);
const searchInput = document.createElement('input');
searchInput.setAttribute('placeholder', 'Search for students...');
searchDiv.appendChild(searchInput);
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchDiv.appendChild(searchButton);
const names = document.getElementsByTagName('h3');

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (list, page) => {
   page = parseInt(page) - 1;
   for (let i = 0; i < list.length; i++) {
      if (i >= (page * 10) && i <= ((10 * page) + 9)) {
         list[i].style.display = '';
      }
      else {
         list[i].style.display = "none";
      }
   }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = list => {
   let pageNumber = Math.ceil(list.length / 10);
   let newDiv = document.createElement("div");
   pageDiv.appendChild(newDiv);
   newDiv.className = 'pagination';
   let ul = document.createElement('ul');
   newDiv.appendChild(ul);
   for (let i = 1; i <= pageNumber; i++) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
   }
   let links = document.querySelectorAll('a');
   links[0].className = 'active';
   ul.addEventListener('click', (e) => {
      for (let i = 0; i < links.length; i++) {
         links[i].classList.remove('active');
      }
      if (event.target.tagName === 'A') {
         event.target.className = 'active';
         showPage(list, event.target.textContent);
      }
   });
};
/*** 
   Create the `SearchName ` to search names in list and display included name.
***/
const searchName = (input, list) => {
   const newList = [];
   for (let i = 0; i < list.length; i++) {
      if (names[i].textContent.toLowerCase().includes(input.toLowerCase())) {
         list[i].style.display = '';
         newList.push(list[i]);
      }
      else {
         list[i].style.display = 'none';
      }
   }
   return newList;
}
/*** 
   Create the `Searchbutton` event to search names based on search button.
***/
searchButton.addEventListener('click', (e) => {
   e.preventDefault();
   visibleLinks();
});
/*** 
   Create the `SearcInput` event to search names based on keyup event.
***/
searchInput.addEventListener('keyup', (e) => {
   e.preventDefault();
   visibleLinks();
});

/*** 
   Created the `hideButton` fuction to hide orginal page numbers.
***/
const hideButton = () => {
   let pageNumber = document.querySelectorAll('li a');
   for (let i = 0; i < pageNumber.length; i++) {
      pageNumber[i].parentNode.removeChild(pageNumber[i]);
   }
};
/***created the function `visibleLinks` to show new pagination links and to show name is there or not */
const visibleLinks = () => {
   let array = [];
   let input = searchInput.value;
   array = searchName(input, list);
   if (array.length !== 0) {
      if (input !== '') {
         hideButton();
         appendPageLinks(array);
      }
      else {
         hideButton();
         appendPageLinks(list);
         showPage(list, 1);
      }
   }
   else {
      alert('No result found');
   }
}

window.onload = () => {
   appendPageLinks(list);
   showPage(list, 1);
};