const allPostApi = 'https://openapi.programming-hero.com/api/retro-forum/posts';   //this is post api
const latestPostApi = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';    //this is latest post api
const latestPost = document.getElementById('latestPost');
const postItems = document.getElementById('postItems');
const red = '<div class="absolute -top-1 -right-1 rounded-full bg-red-600 z-5 p-2" style="border:1px solid white;"></div>'
const green = '<div class="absolute -top-1 -right-1 rounded-full bg-green-600 z-5 p-2" style="border:1px solid white;"></div>'
const postLoader= document.getElementById('postLoader');

// this is for loading my page 
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('mainloader').classList.add('hidden');
    }, 2000);
});


// this function is for fetching data when website load 
const DataFetching = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    datashowing(data)
}
DataFetching(latestPostApi);
DataFetching(allPostApi);

// this is fetching search value api
const searchDataFetching = async (searchVAlue) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchVAlue}`);
    const data = await response.json();
    datashowing(data)
}

// this event listner for responsive navbar colling 
document.getElementById('navCall').addEventListener('click', () => {
    document.getElementById('navItems').classList.toggle('navActive');
});

// this function is for searching value by category
document.getElementById('submit').addEventListener('click', () => {
    const searchValue = document.getElementById('searchValue');
    const searchValueLower = searchValue.value.toLowerCase();
    searchValue.value = '';
    postItems.classList.add('hidden')
    postLoader.classList.remove('hidden')

    // this is for post loading
    setTimeout(() => {
        postLoader.classList.add('hidden')
        postItems.classList.remove('hidden')
    }, 2000);

    searchDataFetching(searchValueLower);
    postItems.innerHTML = '';
});

// this function is for displaying data on browser
const datashowing = (data) => {
    if (Array.isArray(data)) {
        data.forEach(items => {
            addLetestPost(items)
        });
    } else {
        const postData = data.posts
        postData.forEach(items => {
            AddPost(items, red, green);
        });
    }
}

// this function is for adding post data as html element 
const AddPost = (items, red, green) => {
    const postHtmlelement = `<div class="w-full p-5 gap-3 flex flex-col sm:flex-row bg-green-50 shadow-xl boxHover rounded-xl">
                                    <div class="profile">
                                        <div class="relative w-[70px] h-[70px]">
                                            <img src="${items.image}" alt="profile" class="w-full h-full rounded-md">
                                            ${items.isActive == true ? green : red}
                                        </div>
                                    </div>
                                    <div class="w-full">
                                        <div class="flex gap-10">
                                            <span># ${items.category}</span>
                                            <span>Author : ${items.author.name}</span>
                                        </div>
                                        <h1 class="text-2xl my-5">${items.title}</h1>
                                        <p class="text-md my-5">${items.description}</p>
                                        <div class="w-full p-4 flex justify-between" style="border-top: 1px dashed gray;">
                                            <div class="flex gap-5">
                                                <a href="#"><i class="fa-regular fa-message"></i> ${items.comment_count}</a>
                                                <a href="#"><i class="fa-regular fa-eye"></i> ${items.view_count}</a>
                                                <a href="#"><i class="fa-regular fa-clock"></i> ${items.posted_time} min</a>
                                            </div>
                                            <span onclick="handleProfileClick('${items.title}', '${items.view_count}')" class="p-2 w-10 rounded-full cursor-pointer text-center bg-green-500"><i class="fa-solid text-white fa-envelope-open"></i></span>
                                        </div>
                                    </div>
                                </div>`;
        postItems.innerHTML += postHtmlelement;
}

// this function is for adding latest post data as html element 
const addLetestPost = (items) => {
    latestPostElement = `<div class="card w-96 bg-base-100 shadow-xl">
    <figure class="p-10">
      <img src="${items.cover_image}" alt="Shoes" class="rounded-xl h-[180px] w-full" />
    </figure>
    <div class="card-body -mt-8">
        <small><i class="fa-regular fa-calendar-check"></i> <span>${items.author.posted_date == undefined ? 'No publish date' : items.author.posted_date}</span></small>
      <h2 class="card-title my-2">${items.title}</h2>
      <p>${items.description}</p>
      <div class="w-full flex gap-3 mt-2">
        <img src="${items.profile_image}" alt="profile" class="w-[50px] h-[50px] rounded-full">
        <div class="">
            <h3 class="text-md font-bold">${items.author.name}</h3>
            <p>${items.author.designation == undefined ? 'Unknown' : items.author.designation}</p>
        </div>
      </div>
    </div>
  </div>`;
latestPost.innerHTML += latestPostElement
}

// this function is for adding value mark as read 
let counter = 0;
const handleProfileClick = (title , view_count) =>{
    const readBox = document.getElementById('readBox')
    const readNumber = document.getElementById('readNumber')
    counter = counter + 1;
    readNumber.innerText = counter
    const readchildern = `<div class="flex shadow-sm justify-between bg-white rounded-md my-2 items-center p-3">
    <h1 class="text-md">${title}</h1>
    <small class="flex justify-center items-center"><i class="fa-regular fa-eye"></i>${view_count}</small>
</div>`;
readBox.innerHTML += readchildern
}
