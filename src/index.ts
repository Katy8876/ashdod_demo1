import { fetchData,setToStorage, getFromStorage} from "./utils/functions.js"
import {MyComment,Post, User} from "./utils/classes.js";
const urlPathPosts: string = "https://jsonplaceholder.typicode.com/posts";
const urlPathUsers: string = "https://jsonplaceholder.typicode.com/users";

// let par1: HTMLParagraphElement = document.getElementById("par1") as HTMLParagraphElement;
// const testDiv = document.getElementById("test") as HTMLDivElement
// const input1 = document.getElementById("input1") as HTMLInputElement
// par1.innerText = "Hello from TS!"



window.onload = async () => {
    let allPosts : unknown;
    if(localStorage.getItem("allPosts")) {
          allPosts=JSON.parse(localStorage.getItem("allPosts"))
     }else{
          allPosts = await fetchData(urlPathPosts);
          let allUsers=await fetchData(urlPathUsers);
          let newPostArr : Post[]=[];

          for (let i = 0; i < (allPosts as Array<any>).length; i++){
            let currentPost=(allPosts as Array<any>)[i];            //  current Post
            let userName:string="";
            for (let j:number = 0; j < (allUsers as Array<any>).length; j++)
             {
               if ((allUsers as Array<any>)[j].id==currentPost.userId)
                {
                   userName=(allUsers as Array<any>)[j].name;
                   break;
                 }
              }
            let newPost : Post = new Post(currentPost.id, userName, currentPost.title, currentPost.body);
            newPostArr.push(newPost);
           }
          localStorage.setItem("allPosts",JSON.stringify(newPostArr)) ;
     }
    console.log(allPosts);
    const postsContainer: HTMLDivElement = document.getElementById("posts-container") as HTMLDivElement;
    for (let i: number = 0; i < (allPosts as Array<any>).length; i++) {
        let postTitle = document.createElement("p") as HTMLParagraphElement;
        let postBody = document.createElement("p") as HTMLParagraphElement;
        let postLikeSymbol=document.createElement("p") as HTMLParagraphElement;

        postTitle.innerText = `Title: ${(allPosts as Array<any>)[i].postTitle}`
        postBody.innerText = `Body: ${(allPosts as Array<any>)[i].postBody}`
        postLikeSymbol.innerHTML=(allPosts as Array<any>)[i].postLikes.length>0? (allPosts as Array<any>)[i].postLikes.length +"&#x2764" 
                                                                         :String(0)+"&#x2661;"

        postLikeSymbol.className="likeElement";
        postLikeSymbol.id="like"+String(i);

        postLikeSymbol.addEventListener(
            "click",
            () => {
                like_handler(i)
                                            });
           
            //commenLikeSymbol.innerHTML="&#x2661;"

        let postCard = document.createElement("div") as HTMLDivElement;
        postCard.className = "post-card"
        postCard.appendChild(postTitle);
        postCard.appendChild(postBody);
        postCard.appendChild(postLikeSymbol);

        const containerComment = document.createElement("div") as HTMLDivElement;
        containerComment.className = "container";

        const commentSection = document.createElement("div") as HTMLDivElement;
        commentSection.className = "comment-section";

        const buttonsGroup = document.createElement("div") as HTMLDivElement;
        buttonsGroup.className = "mb-4";

        const buttonsGroupInner = document.createElement("div") as HTMLDivElement;
        buttonsGroupInner.className = "d-flex gap-3";

        const buttonsGroupInner2 = document.createElement("div") as HTMLDivElement;
        buttonsGroupInner2.className = "flex-grow-1";
        buttonsGroupInner2.innerHTML = `
             <input id="comment-${String(i)}" class="form-control comment-input" rows="3" placeholder="Write a comment..."></input>
        `
        const btnBox = document.createElement("div") as HTMLDivElement;
        btnBox.className = "mt-3 text-end"

        let buttonComment = document.createElement("button") as HTMLButtonElement;

        buttonComment.textContent = "Post Comment"
        buttonComment.className = "btn btn-comment text-white";
        buttonComment.addEventListener(
            "click",
            () => {
                postComment(i)
                                 } );

        //create new Comment interface
        btnBox.appendChild(buttonComment);

        buttonsGroupInner2.appendChild(btnBox);
        buttonsGroupInner.appendChild(buttonsGroupInner2);
        buttonsGroup.appendChild(buttonsGroupInner);

        commentSection.appendChild(buttonsGroup);
        containerComment.appendChild(commentSection);
        postCard.appendChild(containerComment);

        //display all comments
        const commentsList = document.createElement("div") as HTMLDivElement;
        commentsList.className = "comments-list";
        commentsList.id = `comments-list-${String(i)}`

        if(((allPosts as Array<any>)[i] as Post).postComments.length>0){
            for (let j: number = 0; j < ((allPosts as Array<any>)[i] as Post).postComments.length; j++) 
             {
                let currentComment=((allPosts as Array<any>)[i]as Post).postComments[j];
                 commentsList.innerHTML += `
                        <div class="comment-box">
                                <div class="d-flex gap-3">
                                    <div class="flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                            <h6 class="mb-0"></h6>
                                            <h6 class="mb-0">${currentComment.commentAuthor}</h6>
                                            <span class="comment-time">${currentComment.commentDate}</span>
                                        </div>
                                        <p class="mb-2">${currentComment.commentBody}.</p>
                                     </div>
                                </div>
                        </div>  
                        <div id="divCommentElements">
                        </div>  `

                        const divCommentElements = document.createElement("div") as HTMLDivElement;
                        divCommentElements.id = "divCommentElements";

                        let buttoncommentTOcomment = document.createElement("button") as HTMLButtonElement;
                        let commentLikeSymbol=document.createElement("p") as HTMLParagraphElement;


                        buttoncommentTOcomment.textContent = "Comment"
                        buttoncommentTOcomment.className = "btn btn-comment text-white";
                        buttoncommentTOcomment.addEventListener(
                            "click",
                            () => {
                                clickfunc(j)
                                                 } );
                
                        commentLikeSymbol.innerHTML="&#x2661;"

                         commentLikeSymbol.id="commentlikeElement";
                         //commentLikeSymbol.id="like"+String(i);

                         commentLikeSymbol.addEventListener(
                        "click",
                        () => {
                        clickfunc(i)
                                            });                                                 
                        //create new Comment interface
                        divCommentElements.appendChild(buttoncommentTOcomment);
                        divCommentElements.appendChild(commentLikeSymbol);
                        
                        commentsList.appendChild(divCommentElements);
              }
          }
        postCard.appendChild(commentsList);
        postsContainer.appendChild(postCard);
     }

}

function postComment(i: (number | string)): void {
    let inputValue = document.getElementById(`comment-${String(i)}`) as HTMLInputElement;
    let commentsList = document.getElementById(`comments-list-${String(i)}`) as HTMLDivElement;
    let userNameStorege=JSON.parse(localStorage.getItem("currentUser"));

    let d = new Date();
    let timeStampPost = `
        ${d.getHours() < 10 ? "0" + d.getHours() : d.getHours()}
    :
        ${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}
    :
        ${d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()}
    `
     /*comment likes */

    commentsList.innerHTML += `
        <div class="comment-box">
                <div class="d-flex gap-3">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="mb-0">${userNameStorege?userNameStorege.userName:"no user"}</h6>
                            <span class="comment-time">${timeStampPost}</span>
                        </div>
                        <p class="mb-2">${inputValue.value}.</p>
                    </div>
                 </div>
        </div>
           `

        const divCommentElements = document.createElement("div") as HTMLDivElement;
        divCommentElements.id = "divCommentElements";

        let buttoncommentTOcomment = document.createElement("button") as HTMLButtonElement;
        let commentLikeSymbol=document.createElement("p") as HTMLParagraphElement;


        buttoncommentTOcomment.textContent = "Comment"
        buttoncommentTOcomment.className = "btn btn-comment text-white";
        buttoncommentTOcomment.addEventListener(
            "click",
            () => {
                clickfunc(i)
                                 } );

        commentLikeSymbol.innerHTML="&#x2661;"

         commentLikeSymbol.id="commentlikeElement";
         //commentLikeSymbol.id="like"+String(i);

         commentLikeSymbol.addEventListener(
        "click",
        () => {
        clickfunc(i)
                            });                                                 
        //create new Comment interface
        divCommentElements.appendChild(buttoncommentTOcomment);
        divCommentElements.appendChild(commentLikeSymbol);
        
        commentsList.appendChild(divCommentElements);

    let currentPost:any=getFromStorage("allPosts","postId",String(+i+1))
    let newComment : MyComment=new MyComment((currentPost as Post).postComments.length+1,userNameStorege.userName, inputValue.value, timeStampPost);
    (currentPost as Post).postComments.push(newComment);
    setToStorage("allPosts",+i,currentPost);
    console.log(currentPost.postComments.length)

    commentLikeSymbol.addEventListener(
        "click",
        () => {   
            console.log((currentPost as Post).postComments.length)
            for(let x:number=0;(currentPost as Post).postComments.length;x++){
              console.log(currentPost.postComments[x].commentId)
              console.log(userNameStorege.userId)
              if (currentPost.postComments[x].commentId==userNameStorege.userId){

                currentPost.postComments[x].commentLikes+=1
                console.log(currentPost.postComments[x].commentLikes)
                //  commentLike_handler(i)

                commentLikeSymbol.innerHTML=currentPost.postComments[x].commentLikes+ "&#x2764" 
                

              }

           }
         });
      
 }

 function clickfunc(i:(number|string)):void{
    alert(i)
 }

function like_handler(i:(number|string)):void{
 
    let currentPost:any=getFromStorage("allPosts","postId",String(+i+1));
//  let newComment:MyComment=new MyComment((currentPost as Post).postComments.length+1,"Katy C",inputValue.value,timeStampPost);
    if(localStorage.getItem("currentUser")){
        let userDetails=JSON.parse(localStorage.getItem("currentUser"));
        for(let j:number=0;j<currentPost.postLikes.length;j++){
            /*    -----   like*/
             if (currentPost.postLikes[j].userId==userDetails.userId){
                console.log(currentPost.postLikes);
                currentPost.postLikes.splice(j,1);
                console.log(currentPost.postLikes);
                (document.getElementById("like"+String(i)) as HTMLParagraphElement).innerHTML=
                currentPost.postLikes.length+"&#x2661;";
                 //postLikeSymbol.innerHTML=(allPosts as Array<any>)[i].postLikes.length>0?
                // (allPosts as Array<any>)[i].postLikes.length +"&#x2764" 
                setToStorage("allPosts",+i,currentPost);``
                 window.location.reload();
                 return;
              }
             window.location.reload();
          }
           /*   +++++   like*/
        (currentPost as Post).postLikes.push({
            userId : userDetails.userId ,
            userName : userDetails.userName   });

         window.location.reload();
     }  
    else{
        (currentPost as Post).postLikes.push({
            userId : "no id" ,
            userName : "no user"  });
     }

    setToStorage("allPosts",+i,currentPost);
    window.location.reload();
}

let loginLink= document.getElementById("loginLink");
let modal= document.getElementById("modal") as HTMLDialogElement;
let loginUser=document.getElementById("signInBtn") as HTMLButtonElement
let logOutLink=document.getElementById("logOutLink");
//let username = document.getElementById(`userInput`) as HTMLInputElement;

//let username =$("#userInput").val();
//let userid=$("#userId").val();



logOutLink.addEventListener(
    "click",
    () => {
        alert("log out")
        localStorage.removeItem("currentUser");  });

function loginUserFunc(){
    modal.showModal();
}

loginLink.addEventListener(
    "click",
    () => {
        loginUserFunc();  });

loginUser.addEventListener(
    "click",
    () => {
        alert(555)
        //localStorage.setItem("currentUser", JSON.stringify(username.value));
        localStorage.setItem("currentUser",
            JSON.stringify({
                userName : (document.getElementById("userInput")as HTMLInputElement).value  ,
                userId : (document.getElementById("userId")as HTMLInputElement).value
         }));
                   
        modal.close();
});
    


