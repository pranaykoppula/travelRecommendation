const data = fetch("./travel_recommendation_api.json")
.then((response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.blob();
});
console.log(data);

function render(){
    const urlParams = new URLSearchParams(window.location.search);
    const keyword=urlParams.get("search");
    if (keyword.length>0){
        const resultsEl=document.querySelector("#home-right");
        
    }
    const searchButton=document.querySelector("#search-button");
    const searchClear=document.querySelector("#search-clear");
    const searchInput=document.querySelector("#search-input");
    searchButton.addEventListener("click",(e)=>{
        e.preventDefault();
        const searchTerm=searchInput.value.trim().toLowerCase();
        if (searchTerm.length>0){
        searchInput.value="";
        window.location.assign(`travel_recommendation.html?search=${searchTerm}`);}
    });
    searchClear.addEventListener("click",(e)=>{
        e.preventDefault();
        searchInput.value="";
        window.location.assign("travel_recommendation.html");
    });
    try{
    const form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        alert("Message sent! We'll get back to you shortly.");
        form.reset();
    });}
    catch (error){
        alert(error);
    }

}

document.addEventListener("DOMContentLoaded",render);