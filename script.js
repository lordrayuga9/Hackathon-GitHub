const container = document.createElement("div");
container.className = "container";
container.innerHTML=`
 <div class="search">
                <input type="text" class="search-bar" placeholder="Access Github Repositories Using GIT UserName">
                <button><i class="fab fa-searchengin"></i></button>
                
            </div>
            
            <div class="header">
                <img src="" alt="" class="photo">
                <h3 class="user-name"></h3>
                <h3 class = "repos"> </h3>
            </div>
            <div class="repositoryList"></div>
            <div class="pagination"></div>
        
`
document.body.append(container)
//  SEARCH FUNCTION
 
function search() {
    loadRepos(document.querySelector(".search-bar").value);
     document.querySelector(".search-bar").value ="";
  document.querySelector(".repositoryList").innerHTML="";
  document.querySelector(".pagination").innerHTML="";
  document.querySelector(".photo").src="";
  document.querySelector(".user-name").innerText="";
  document.querySelector(".repos").innerText="";
  
}


document
    .querySelector(".search button")
    .addEventListener("click", function(){
        search();
    })
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event){
        if(event.key=="Enter"){
            search();
        }
    })
// SEARCH FUNCTION ENDS
    


// LOADING REPOSITORY
 async function loadRepos(user){
    
    
    try{ 
    const data = await fetch(`https://api.github.com/users/${user}/repos`,{
    method:"GET"
})  

    const RepoData = await data.json();

    console.log(RepoData)

    // HEADER INFO 
    document.querySelector(".photo").src= RepoData[0].owner.avatar_url;
    document.querySelector(".user-name").innerText = `Name : ${RepoData[0].owner.login}`;
    document.querySelector(".repos").innerText=`Repositories : ${RepoData.length}`
    
    //  DISPLAY ELEMENTS IN A SINGLE PAGE
    const repositoryList = document.querySelector(".repositoryList");
    
    const pagination_element= document.querySelector(".pagination");

    let current_page = 1;
    let row = 6;
  
  
    // To Display required items in a page
    function Display_Repos(items, listbox, rows_per_page, page){
        listbox.innerHTML="";
        page--;
        let start = page * rows_per_page;
        let end = start + rows_per_page;
        
        let paginatedItems = items.slice(start, end);

	for (let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i];
            
            let item_element = document.createElement("div");
            item_element.className="item";

            item_element.innerHTML = `<a href="${item.html_url}" target="_blank">
            <h4><span>Name</span> : ${item.name}</h4>
            <h4><span>Fork-Count</span> : ${item.forks}</h4>
            <h4><span>Stars-Count</span> : ${item.stargazers_count}</h4>
            </a>`

            listbox.append(item_element);
        }


    }
    // Setting Pagination
    
    function SetupPagination (items, paginationbox, rows_per_page) {
        paginationbox.innerHTML = "";
    
        let page_count = Math.ceil(items.length / rows_per_page);
        for (let i = 1; i < page_count + 1; i++) {
            let btn = PaginationButton(i, items);
            paginationbox.appendChild(btn);
        }
    }
    
//    Creating buttons and linking them
 

    function PaginationButton (page, items) {
        let button = document.createElement('button');
        button.innerText = page;
    
        if (current_page == page) button.classList.add('active');
    
        button.addEventListener('click', function () {
            current_page = page;
            Display_Repos(RepoData, repositoryList, row, current_page);
    
            let current_btn = document.querySelector('.pagination button.active');
            current_btn.classList.remove('active');
    
            button.classList.add('active');
        });
    
        return button;
    }
    Display_Repos(RepoData, repositoryList, row, current_page)
    SetupPagination(RepoData,pagination_element,row)


    }catch(error){
        alert("Please Enter valid User Name");
    }

}


