import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc,getDocs, query, orderBy,where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAOExPTUniIGuFk8agEYxMf1SwLjXrLnz4",
    authDomain: "blogsphere-62946.firebaseapp.com",
    projectId: "blogsphere-62946",
    storageBucket: "blogsphere-62946.appspot.com",
    messagingSenderId: "629494813177",
    appId: "1:629494813177:web:e705cbc046de5d8ad82d28",
    measurementId: "G-TVV592QYJN"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logoutBtn = document.getElementById('logoutBtn');
const addBlogBtn = document.getElementById('addBlogBtn');
const blogList = document.getElementById('blogList');

logoutBtn.addEventListener("click", function(event) {
    event.preventDefault();
    signOut(auth).then(() => {
      window.location.href = 'index.html';
    }).catch((error) => {
      alert("Signout Error,Try Again!!");
    });
});
  

addBlogBtn.addEventListener('click', async () => {
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    
    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        created_at: new Date(),
        title_lowercase: title.toLowerCase(),
        user_email: auth.currentUser.email,
      });
      alert('Blog added successfully!');
      loadBlogs(); 
      title.value = '';
      content.value = '';
    } catch (error) {
      console.error('Error adding blog:', error);
      alert('Failed to add blog.');
    }
});

sortSelect.addEventListener('change', () => {
    loadBlogs(sortSelect.value);
});
  
function renderBlogList(snapshot) {
    blogList.innerHTML = '<h2>Blogs</h2>'; 
  
    if (snapshot.empty) {
      blogList.innerHTML += `
        <div class="no-blogs">
          <img src="/error.png" alt="No blogs">
        </div>
      `;
    } else {
      snapshot.forEach((doc) => {
        const blog = doc.data();
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');
        blogItem.innerHTML = `
          <h3>${blog.title}</h3>
          <p>${blog.content}</p>
          <small>Created by: ${blog.user_email} on ${blog.created_at.toDate().toLocaleString()}</small>
        `;
        blogList.appendChild(blogItem);
      });
    }
}
  
function loadBlogs(sortBy = 'created') {
    let blogsQuery;
  
    switch (sortBy) {
      case 'title':
        blogsQuery = query(collection(db, 'blogs'), orderBy('title_lowercase'));
        break;
      case 'created':
      default:
        blogsQuery = query(collection(db, 'blogs'), orderBy('created_at', 'desc'));
        break;
    }
  
    getDocs(blogsQuery)
      .then((snapshot) => {
        renderBlogList(snapshot);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        blogList.innerHTML = '<h2>Error fetching blogs.</h2>';
    });
}

const showMyBlogsBtn = document.getElementById('showMyBlogsBtn');

showMyBlogsBtn.addEventListener('click', () => {
    loadMyBlogs();
});

function loadMyBlogs() {
    console.log(auth.currentUser.email);
    const currentUserEmail = auth.currentUser.email;

    const blogsQuery = query(collection(db, 'blogs'),where('user_email', '==', currentUserEmail),orderBy('created_at', 'desc'));

    getDocs(blogsQuery)
        .then((snapshot) => {
            renderBlogList(snapshot);
        })
        .catch((error) => {
            console.error('Error fetching blogs:', error);
            blogList.innerHTML = '<h2>Error fetching blogs.</h2>';
    });
}

loadBlogs();
  

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'index.html';
    }
    else {
        loadBlogs(); 
    }
});