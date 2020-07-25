let blogPath = window.location.pathname;
let blogName = blogPath.split("/").pop().split(".").shift();
let blogID = blogName.split("blog").pop();
let singlePage = blogID != "index" && blogID != "-archive" && blogID;

function blogTXT(id) {
  let textPath = "/Blog/blog-text/blog".concat(id, ".txt");
  return textPath;
}

if (singlePage) {
  var numberOfBlogs = 1; //number of images on the single page
  var content;
  var title;
  var text;
} else {
  var content = [];
  var title = [];
  var text = [];
}
if (blogID == "-archive") {
  var numberOfBlogs = 7; // number of blog cards to show on archive page
}
if (blogID == "index" || blogID == false) {
  var numberOfBlogs = 6; // number of blog cards to show on home page
}

//blog image
let blogImg = document.querySelector(".blog-image");
if (singlePage) {
  let imgPath = "/Blog/blog-images/blog".concat(blogID, ".jpg");
  blogImg.src = imgPath;
}

//blog Title
readBlog();
formatTitle();
classInsert(".blog-title", title);
//blog Text
formatText();
classInsert(".blog-text", text);

//cards
let blogCardsArchive = document.querySelector(".blog-cards-archive");
if (blogCardsArchive) {
  let cardCount = numberOfBlogs;
  let card = [];
  formatTitle();
  formatText();
  let blogLink = [];
  let imgPath = [];
  for (let i = 1; i <= numberOfBlogs; i++) {
    blogLink.push("/Blog/blog".concat(i, ".html"));
    imgPath.push("/Blog/blog-images/blog".concat(i, ".jpg"));
  }

  let cardParts = [
    "<div class='col-md-6 col-12 text-dark mb-3'><div class='card'><a href='",
    "' class='card-link'><img class='card-img-top' src='",
    "' alt='Card image cap'/></a><div class='card-body'><h5 class='card-title font-weight-bold'>",
    "</h5><p class='card-text'>",
    "</p><a href='",
    "' class='btn btn-danger'>Read More</a></div></div></div>",
  ];

  for (let i = 0; i < cardCount + 1; i++) {
    var con = cardParts[0].concat(
      blogLink[i],
      cardParts[1],
      imgPath[i],
      cardParts[2],
      title[i],
      cardParts[3],
      text[i],
      cardParts[4],
      blogLink[i],
      cardParts[5]
    );
    card.push(con);
  }

  for (let i = 0; i < cardCount; i++) {
    blogCardsArchive.innerHTML += card[i];
  }
}

//whole bunch of functions
function readBlog() {
  for (let i = 1; i <= numberOfBlogs; i++) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (!singlePage) {
          content.push(this.responseText);
        }
        if (singlePage) {
          content = this.responseText;
        }
      }
    };
    if (!singlePage) {
      xhttp.open("GET", blogTXT(i), false);
    } else {
      xhttp.open("GET", blogTXT(blogID), false);
    }

    xhttp.send();
  }
}

function classInsert(className, insertion) {
  let allEl = document.querySelectorAll(className);
  for (let i = 0; i < allEl.length; i++) {
    allEl[i].innerHTML = insertion;
  }
}

function formatTitle() {
  if (!singlePage) {
    for (let i = 0; i < numberOfBlogs; i++) {
      let lineBreak = content[i].split("\n");
      title.push(lineBreak.shift());
    }
  } else {
    let lineBreak = content.split("\n");
    title = lineBreak.shift();
  }
}

function formatText() {
  if (!singlePage) {
    for (let i = 0; i < numberOfBlogs; i++) {
      let lineBreak = content[i].split("\n");
      text.push(truncateString(lineBreak[3], 100));
    }
  } else {
    let lineBreak = content.split("\n");
    lineBreak.shift();
    let subtitlesID = getAllIndexes(lineBreak, false);
    for (let i = 0; i < subtitlesID.length; i++) {
      let combined = "<br /><span class='h4'>".concat(
        lineBreak[subtitlesID[i] + 1],
        "</span>"
      );
      lineBreak.splice(subtitlesID[i] + 1, 1, combined);
    }
    text = lineBreak.filter((arr) => arr != false).join("<br />");
  }
}

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      indexes.push(i);
    }
  }
  return indexes;
}

//1 blog link
//2 blog image
//3 Title
//4 excerpt
//5 blog link again
