
let myLeads = [];
const tabs=[]
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn=document.getElementById("delete-btn");
const tabBtn=document.getElementById("tab-btn").addEventListener("click",function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        Render(myLeads)
    })
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    Render(myLeads);
})
/*
localStorage.setItem("myLeads","www.example.com")
console.log(localStorage.getItem("myLeads"))
localStorage.clear()*/
//storing the values in localstorage in key-value pair
let leadsFromLocalStorage= JSON.parse( localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);


if (leadsFromLocalStorage) {
    myLeads= leadsFromLocalStorage;
    Render(myLeads);
};
function Render(leads) {
    //listItems holds the leads which are entered through the input box initially it is set to empty
    let listitems = "";
    //the for loop is used to print the values entered through the input tag.
    for (let i = 0; i < leads.length; i++) {
        //this prints the elements in an unordered list with bullets attatched
        listitems += 
        `<li>
            <a target='_blank' href='${leads[i]}'> 
            ${leads[i]} 
        </li>`
    };
    // using the innerHtml tag to use template string
    ulEl.innerHTML = listitems;
}


inputBtn.addEventListener("click", function () {
    //pushing values from input box to the array on click
    myLeads.push(inputEl.value);
    //clearing the input box
    inputEl.value="";

    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    //render the leads for printing on screen
    Render(myLeads);

    console.log(localStorage.getItem("myLeads"));
    console.log(typeof myLeads);
});
delBtn.addEventListener("click",function(){
    localStorage.clear();
    myLeads=[];
    Render(myLeads);
})
