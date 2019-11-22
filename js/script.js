/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const list=document.querySelectorAll('li.student-item');
const pageDiv= document.querySelector('div.page');
const searchDiv=document.createElement('div');
searchDiv.className='student-search';
pageDiv.firstElementChild.appendChild(searchDiv);
const searchInput=document.createElement('input');
searchInput.setAttribute('placeholder','Search for students...');
searchDiv.appendChild(searchInput);
const searchButton=document.createElement('button');
searchButton.textContent='Search';
searchDiv.appendChild(searchButton);
const names=document.getElementsByTagName('h3');

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

const showPage=(list,page)=>{
   page=parseInt(page)-1;
   for(let i=0;i<list.length;i++){
      if(i>=(page*10) &&i<=((10*page)+9)){
         list[i].style.display='';
      }
      else{
         list[i].style.display="none";
      }
   } 
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks=list=>{
   let pageNumber = Math.ceil(list.length/10);
   let newDiv = document.createElement("div");
   pageDiv.appendChild(newDiv);
   newDiv.className = 'pagination';
   let ul = document.createElement('ul');
   newDiv.appendChild(ul);
   for(let i=1;i<=pageNumber;i++){
    let li=document.createElement('li');
    let a=document.createElement('a');
    a.textContent=i;
    li.appendChild(a);
    ul.appendChild(li);
   }
   let links=document.querySelectorAll('a');
   links[0].className='active';
   ul.addEventListener('click',(e)=>{
   for(let i=0;i<links.length;i++){
      links[i].classList.remove('active');
   }
      if(event.target.tagName==='A'){
         event.target.className='active';
         showPage(list,event.target.textContent);
      }
   });
};
/*** 
   Create the `SearchName ` to search names in list and display included name.
***/
const searchName=(input,list)=>{
   const newList=[];
   for(let i=0;i<list.length;i++){
      if(names[i].textContent.toLowerCase().includes(input.toLowerCase())){
         list[i].style.display='';
         newList.push(list[i]);
      }
      else{
         list[i].style.display='none';
      }
   }
   return newList;
}
/*** 
   Create the `Searchbutton` event to search names based on search button.
***/
searchButton.addEventListener('click',(e)=>{
   let newList = [ ];
   e.preventDefault(); 
   let input=searchInput.value;
   newList = searchName(input,list);
   hideButton();
   appendPageLinks(newList);

});
/*** 
   Create the `SearcInput` event to search names based on keyup event.
***/
searchInput.addEventListener('keyup',(e)=>{
   let array = [ ];
   e.preventDefault(); 
   let input=searchInput.value;
   if(input!==''){
   hideButton();
   array=searchName(input,list);
   appendPageLinks(array);
   }
   else{
   hideButton();
   appendPageLinks(list);
   showPage(list,1); 
   }
});
/*** 
   Created the `hideButton` fuction to hide orginal page numbers.
***/
const hideButton=()=>{
   let pageNumber=document.querySelectorAll('li a');
   for(let i=0;i<pageNumber.length;i++){
      pageNumber[i].parentNode.removeChild(pageNumber[i]);
   }
};



window.onload=()=>{
   appendPageLinks(list);
   showPage(list,1);
};