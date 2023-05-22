const postsContainer = document.getElementById("posts-container");
const loding = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data; // You have to await when you use this function
}

// Show posts in DOM

async function ShowPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">
        ${post.body}
      </p>
    </div>
    `;
    postsContainer.appendChild(postEl);
  });
}

// Show loader and fecth more posts
function showLoading() {
  loding.classList.add("show");

  setTimeout(() => {
    loding.classList.remove("show");

    setTimeout(() => {
      page++;
      ShowPosts();
    }, 300);
  }, 1000);
}

// Show initial post
ShowPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
