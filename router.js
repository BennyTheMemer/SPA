document.addEventListener("DOMContentLoaded", () => {
  const path = new URL(window.location.href);
  renderPage(path);

  //When the document is loaded we need get our anchor tags and add a click event to them, and prevent the default event that would be triggered.
  const anchorTags = document.getElementsByTagName("a");

  //Notice the let ... of loop and not let ... in.
  for (let myAnchorTag of anchorTags) {
    myAnchorTag.addEventListener("click", (event) => {
      //For each anchor we need to prevent the default behaviour that would get the user into a certain route because of the "href" attribute
      event.preventDefault();
      console.log("I was clicked!");
      //Then we need to actually get the href value and see where the user was going to
      const userNavigationPath = event.target.href;
      //Now we need to do part of what the default event would do, namely build a URL object and push into the navigation history
      const path = new URL(userNavigationPath);
      window.history.pushState(userNavigationPath, "", path);
      renderPage(path);
    });
  }

  document.addEventListener("popstate", (event) => {
    console.log("Listener added!");
  });
  onpopstate = (event) => {
    console.log("popstate");
  };
});

const routes = {
  "/": "./pages/Homepage/HomePage.html",
  "/:name": "./pages/PokemonPage/PokemonPage.html",
};

function parseDynamicPathname(path) {
  const pathParts = path.split("/");

  for (let [route, pageToRender] of Object.entries(routes)) {
    const routeParts = route.split("/");
    if (routeParts.length === pathParts.length) {
      console.log("same length!");
      for (let i = 0; i < pathParts.length; i++) {
        if (pathParts[i] === routeParts[i] || routeParts[i].startsWith(":")) {
          console.log("they are the same, or :!");
          if (i === pathParts.length - 1) {
            return pageToRender;
          }
          continue;
        } else {
          break;
        }
      }
    }
  }
  return false;
}

function renderPage(path) {
  const pageToRender =
    routes[path.pathname] || parseDynamicPathname(path.pathname);
  console.log("Page:", pageToRender);

  fetch(pageToRender)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      const pageContent = document.getElementById("page_content");

      // Set the innerHTML with the fetched HTML content
      pageContent.innerHTML = html;

      // Find all script tags that were just added
      const scripts = pageContent.getElementsByTagName("script");
      // Convert to array because we'll be modifying the live HTMLCollection
      const scriptsArray = Array.from(scripts);

      // Function to load scripts sequentially. This is needed becase after injecting the HTML, although the HTML includes the scripts, they won't run.
      // So we need to just pretty much get the script information from the html file, recreate them and inject them.
      const loadScriptSequentially = (scripts, index) => {
        if (index < scripts.length) {
          const script = scripts[index];
          const newScript = document.createElement("script");

          Array.from(script.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });

          if (script.src) {
            const srcPath = new URL(
              script.src,
              new URL(pageToRender, window.location.href)
            ).pathname;
            newScript.src = srcPath;
            console.log(newScript)
            newScript.onload = () => loadScriptSequentially(scripts, index + 1);
          } else {
            newScript.textContent = script.textContent;
            loadScriptSequentially(scripts, index + 1);
          }

          script.parentNode.replaceChild(newScript, script);
        }
      };

      // Start loading scripts
      loadScriptSequentially(scriptsArray, 0);
    });
}
