(function () {
  myHTMLInclude();

  function myHTMLInclude() {
    var z, i, a, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      file = z[i].getAttribute("w3-include-html");
      if (file) {
        a = z[i].cloneNode(false);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            a.removeAttribute("w3-include-html");
            a.innerHTML = xhttp.responseText;
            z[i].parentNode.replaceChild(a, z[i]);
            myHTMLInclude();
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
  }
})();
