function render(data){
    console.log(data);
    const urlParams = new URLSearchParams(window.location.search);
    const keyword=urlParams.get("search") || "";
    if (keyword){
        fetch("./travel_recommendation_api.json").then(response => response.json()).then(data => {
            if (keyword===""){
                alert("All");
            }
        });
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
        console.log(error);
    }

}

document.addEventListener("DOMContentLoaded", render);