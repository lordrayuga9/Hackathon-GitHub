//  SEARCH FUNCTION
 
function search() {
    loadRepos(document.querySelector(".search-bar").value);
     document.querySelector(".search-bar").value ="";
  document.querySelector(".repositoryList").innerHTML="";
  document.querySelector(".pagination").innerHTML="";
  
     
    
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
    let row = 3;
  
  
    // To Display required items in a page
    function Display_Repos(items, listbox, rows_per_page, page){
        listbox.innerHTML="";
        page--;
        let start = page * rows_per_page;
        let end = start + rows_per_page;
        
        
        for(let i= start;i<end;i++){
            console.log(items[i])
            let item_element = document.createElement("div");
            item_element.className="item";

            item_element.innerHTML = `<a href="${items[i].html_url}" target="_blank">
            <h4><span>Name</span> : ${items[i].name}</h4>
            <h4><span>Fork-Count</span> : ${items[i].forks}</h4>
            <h4><span>Stars-Count</span> : ${items[i].stargazers_count}</h4>
            <h4><span>Repo-Link</span> : ${items[i].html_url}</h4></a>`

            listbox.append(item_element);
        }


    }
    // Setting Pagination
    function SetupPagination(items, paginationbox, rows_per_page){

        let pageCount = Math.ceil(items.length/rows_per_page);
        console.log(pageCount)
        for(let i=1;i<=pageCount;i++){
             let btn = PaginationButton(i);
             paginationbox.append(btn);
        }

    }
//    Creating buttons and linking them
    function PaginationButton(page ){
        let button = document.createElement("button");
        button.innerText = page;

        if(current_page==page) button.className=("active");

        button.addEventListener("click", function(){
            current_page= page;
            Display_Repos(RepoData, repositoryList, row, current_page)
            
            
            let current_btn = document.querySelector(".pagination button.active ");
            current_btn.classList.remove("active");
            button.classList.add("active")
            
        })

        return button;
    }
    Display_Repos(RepoData, repositoryList, row, current_page)
    SetupPagination(RepoData,pagination_element,row)
}

