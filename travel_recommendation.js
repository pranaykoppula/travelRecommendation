const createLocaleMap = (locale) => 
    new Map([
        ["name", locale.name],
        ["description", locale.description],
        ["imageUrl", locale.imageUrl]
    ]);

function render(){
    const urlParams = new URLSearchParams(window.location.search);
    const keyword=urlParams.get("search") || "";
    const cta=document.querySelector("#cta");
    cta.addEventListener("click",(e)=>{
        e.preventDefault();
        window.location.assign('/index.html?search=all');
    });
    if (keyword){
        fetch("./travel_recommendation_api.json").then(response => response.json()).then(data => {
            const destinations = [];
            const cityMaps = data.countries.flatMap(country => country.cities.map(createLocaleMap));
            const templeMaps = data.temples.map(createLocaleMap);
            const beachMaps = data.beaches.map(createLocaleMap);

            if (keyword==="all"){
                // Combining all maps into a single array
            const allLocales = [...cityMaps, ...templeMaps, ...beachMaps];
            destinations.push(...allLocales);                                
            }
            else if (keyword==="beach"||keyword==="beaches"){
                destinations.push(...beachMaps);
            }
            else if (keyword==="city"||keyword==="cities"){
                destinations.push(...cityMaps);
            }
            else if (keyword==="temple"||keyword==="temples"){
                destinations.push(...templeMaps);
            }
            else{
                alert("Invalid search. Please try 'beach', 'temple' or 'city'.")
            }
            if (destinations.length>0){
                const searchSection = document.querySelector("#home-right");
                const resultsList=document.createElement("div");
                resultsList.id="resultsList";
                destinations.forEach(locale=>{
                    const localeDiv = document.createElement("div");
                    localeDiv.className="locale";
                    const localName = document.createElement("h3");
                    localName.textContent=locale.get("name");
                    const localeImg = document.createElement("img");
                    localeImg.src=locale.get("imageUrl");
                    const localeDesc = document.createElement("p");
                    localeDesc.textContent=locale.get("description");
                    const bookLocale = document.createElement("button");
                    bookLocale.textContent="Visit";
                    bookLocale.addEventListener("click",(e)=>{
                        e.preventDefault();
                        alert("Reservation complete!");
                    });
                    localeDiv.appendChild(localName);
                    localeDiv.appendChild(localeImg);
                    localeDiv.appendChild(localeDesc);
                    localeDiv.appendChild(bookLocale);
                    resultsList.append(localeDiv);
                });
                searchSection.appendChild(resultsList);
                if (keyword==="all"){
                    const homeLeft = document.querySelector("#home-left");
                    const ctaMessage = document.createElement("p");
                    ctaMessage.textContent="Visit one of these destinations!";
                    ctaMessage.id="ctaMessage";
                    ctaMessage.className="hero-sub";
                    homeLeft.appendChild(ctaMessage);
                }
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
        window.location.assign(`/index.html?search=${searchTerm}`);}
    });
    searchClear.addEventListener("click",(e)=>{
        e.preventDefault();
        searchInput.value="";
        window.location.assign("/index.html");
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