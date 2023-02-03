const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

//______________________________Queries_________________________________________________
let container = document.querySelector('.container');
const tabs = document.querySelector('.nav-tabs');
const pageContent = document.getElementById('page-content');

//_________________________Get all post and create new post function____________________
const getAllPosts = async () => {
  try {
    const res = await fetch(API_ENDPOINT);
    if (!res.ok) throw new Error('Problem getting posts. Please try again.');
    const posts = await res.json();
    return posts;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const createNewPost = async (uploadPost) => {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadPost),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} : ${data.message} `);
    return data;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

//__________________________________________Pages-Templates___________________________________
const pages = [
  {
    id: 1,
    html: `<h1 class="heading">New Posts</h1>
        <div class="container">
        </div>
        <div class="btn-container">
          <button class="button" id='fetch'>Fetch Posts</button>
        </div>`,
  },
  {
    id: 2,
    html: `<h1 class="heading">Create post</h1>
    <div class="container">
        <form class="create-form">
            <div class="form-group">
              <label for="user">User ID </label>
              <input type="number" id="user"/>
            </div>
            <div class="form-group">
            <label for="blog-title">Blog Title </label>
            <input type="text" id="blog-title"/>
          </div>
          <div class="form-group">
          <label>Content </label>
          <textarea rows="4" cols="200" type="text" id="blog-content"></textarea>
          </div>
        </form>
    </div>
    <div class="btn-container">
      <button class="button" id='save'>Save Post</button>
    </div>`,
  },
];
//__________________________________________UI-Helper-Functions_______________________________________
const renderLoading = () => {
  const loadingHtml = '<h1 class="loading">Loading...</h1>';
  container.insertAdjacentHTML('afterbegin', loadingHtml);
};

const clearContainer = () => {
  container.innerHTML = '';
};

const renderPosts = async () => {
  renderLoading();
  const blogs = await getAllPosts();
  clearContainer();
  const blogsHtml = blogs
    .map(
      (el) => `<article>
  <h2>${el.title}</h2>
  <p>
    ${el.body}
  </p>
  <p style="text-align: right">From user_id ${el.userId}</p>
  </article>`
    )
    .join('');

  container.insertAdjacentHTML('afterbegin', blogsHtml);
};

//___________________________________________Event-Listener____________________________________

// 2 Button event to fetch posts and create new posts
pageContent.addEventListener('click', async (e) => {
  // Check button
  const btn = e.target.closest('#fetch') || e.target.closest('#save');
  if (!btn) return;

  // Fetch button behave when clicked
  if (btn.id === 'fetch') {
    await renderPosts();
  }
  // Save button behave when clicked
  if (btn.id === 'save') {
    const user = document.getElementById('user');
    const blogTitle = document.getElementById('blog-title');
    const blogContent = document.getElementById('blog-content');

    if (!user.value) {
      alert('User id must be a number and not be empty');
      return;
    }

    if (!blogTitle.value || !blogContent.value) {
      alert('Please enter all required fields');
      return;
    }

    const data = await createNewPost({
      title: blogTitle.value,
      body: blogContent.value,
      userId: user.value,
    });

    blogTitle.value = '';
    blogContent.value = '';
    user.value = '';

    alert(
      `Save blog successfully !!! (id : ${data.id}, title : ${data.title})`
    );
  }
});

// Change Tab event
tabs.addEventListener('click', async function (e) {
  const targetTab = e.target.closest('#tab-1') || e.target.closest('#tab-2');
  if (!targetTab) return;

  // Loop through all tabs to remove active-class
  const allTabs = Array.from(this.children);
  allTabs.forEach((tab) => tab.classList.remove('active-tab'));
  targetTab.classList.add('active-tab');

  // Clear page to change by tab number
  pageContent.innerHTML = '';

  // Change page by number
  const pageNumber = +targetTab.dataset.tab;
  pageContent.insertAdjacentHTML('afterbegin', pages[pageNumber - 1].html);
  container = document.querySelector('.container');
  if (pageNumber === 1) {
    await renderPosts();
  }
});

// Fetch data first time when load page.
(async () => {
  await renderPosts();
})();
