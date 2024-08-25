

document.addEventListener('DOMContentLoaded', () => {


    const path = new URL(window.location.href)
    renderPage(path)

    //When the document is loaded we need get our anchor tags and add a click event to them, and prevent the default event that would be triggered.
    const anchorTags = document.getElementsByTagName('a');

    //Notice the let ... of loop and not let ... in.
    for( let myAnchorTag of anchorTags) {
        
        myAnchorTag.addEventListener("click", (event) => {
            //For each anchor we need to prevent the default behaviour that would get the user into a certain route because of the "href" attribute
            event.preventDefault()
            console.log("I was clicked!")
            //Then we need to actually get the href value and see where the user was going to
            const userNavigationPath = event.target.href
            //Now we need to do part of what the default event would do, namely build a URL object and push into the navigation history
            const path = new URL(userNavigationPath)
            window.history.pushState(userNavigationPath, "", path)
            renderPage(path)
        })
    };

    document.addEventListener("popstate", (event) => {console.log("Listener added!")});
    onpopstate = (event) => {console.log("popstate")};
});



const routes = {

    "/": "./pages/HomePage.html",
    "/:name": "./pages/PokemonPage.html"

}

function parseDynamicPathname(path){

    const pathParts = path.split("/")

    for(let [route, pageToRender] of Object.entries(routes)){
        const routeParts = route.split("/")
        if(routeParts.length === pathParts.length){
            console.log("same length!")
            for(let i = 0; i < pathParts.length ; i++){

                if(pathParts[i] === routeParts[i] || routeParts[i].startsWith(":")){
                    console.log("they are the same, or :!")
                    if(i === pathParts.length -1  ){
                        return pageToRender
                    }
                    continue
                }else {
                    break
                }
            }
        }
    }
    return false

}

function renderPage(path){
    console.log(path)
    //check on the router if we have a route for this pathname. The pathname could be dynamic ex: domain.com/charizard or /ditto, which should resolve to /:name
    const pageToRender = routes[path.pathname] || parseDynamicPathname(path.pathname)

    //fetch the content from our route and inject into the HTML
    fetch(pageToRender).then((data) => data.text()).then(html => document.getElementById("page_content").innerHTML = html)


}

