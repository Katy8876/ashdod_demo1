var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchData, setToStorage, getFromStorage } from "./utils/functions.js";
import { MyComment, Post } from "./utils/classes.js";
const urlPathPosts = "https://jsonplaceholder.typicode.com/posts";
const urlPathUsers = "https://jsonplaceholder.typicode.com/users";
// let par1: HTMLParagraphElement = document.getElementById("par1") as HTMLParagraphElement;
// const testDiv = document.getElementById("test") as HTMLDivElement
// const input1 = document.getElementById("input1") as HTMLInputElement
// par1.innerText = "Hello from TS!"
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    let allPosts;
    if (localStorage.getItem("allPosts")) {
        allPosts = JSON.parse(localStorage.getItem("allPosts"));
    }
    else {
        allPosts = yield fetchData(urlPathPosts);
        let allUsers = yield fetchData(urlPathUsers);
        let newPostArr = [];
        for (let i = 0; i < allPosts.length; i++) {
            let currentPost = allPosts[i]; //  current Post
            let userName = "";
            for (let j = 0; j < allUsers.length; j++) {
                if (allUsers[j].id == currentPost.userId) {
                    userName = allUsers[j].name;
                    break;
                }
            }
            let newPost = new Post(currentPost.id, userName, currentPost.title, currentPost.body);
            newPostArr.push(newPost);
        }
        localStorage.setItem("allPosts", JSON.stringify(newPostArr));
    }
    console.log(allPosts);
    console.log(allPosts);

    const postsContainer = document.getElementById("posts-container");
    for (let i = 0; i < allPosts.length; i++) {
        let postTitle = document.createElement("p");
        let postBody = document.createElement("p");
        let postLikeSymbol = document.createElement("p");
        postTitle.innerText = `Title: ${allPosts[i].postTitle}`;
        postBody.innerText = `Body: ${allPosts[i].postBody}`;
        postLikeSymbol.innerHTML = allPosts[i].postLikes.length > 0 ? allPosts[i].postLikes.length + "&#x2764"
            : String(0) + "&#x2661;";
        postLikeSymbol.className = "likeElement";
        postLikeSymbol.id = "like" + String(i);
        postLikeSymbol.addEventListener("click", () => {
            like_handler(i);
        });
        //commenLikeSymbol.innerHTML="&#x2661;"
        let postCard = document.createElement("div");
        postCard.className = "post-card";
        postCard.appendChild(postTitle);
        postCard.appendChild(postBody);
        postCard.appendChild(postLikeSymbol);
        const containerComment = document.createElement("div");
        containerComment.className = "container";
        const commentSection = document.createElement("div");
        commentSection.className = "comment-section";
        const buttonsGroup = document.createElement("div");
        buttonsGroup.className = "mb-4";
        const buttonsGroupInner = document.createElement("div");
        buttonsGroupInner.className = "d-flex gap-3";
        const buttonsGroupInner2 = document.createElement("div");
        buttonsGroupInner2.className = "flex-grow-1";
        buttonsGroupInner2.innerHTML = `
             <input id="comment-${String(i)}" class="form-control comment-input" rows="3" placeholder="Write a comment..."></input>
        `;
        const btnBox = document.createElement("div");
        btnBox.className = "mt-3 text-end";
        let buttonComment = document.createElement("button");
        buttonComment.textContent = "Post Comment";
        buttonComment.className = "btn btn-comment text-white";
        buttonComment.addEventListener("click", () => {
            postComment(i);
        });
        //create new Comment interface
        btnBox.appendChild(buttonComment);
        buttonsGroupInner2.appendChild(btnBox);
        buttonsGroupInner.appendChild(buttonsGroupInner2);
        buttonsGroup.appendChild(buttonsGroupInner);
        commentSection.appendChild(buttonsGroup);
        containerComment.appendChild(commentSection);
        postCard.appendChild(containerComment);
        //display all comments
        const commentsList = document.createElement("div");
        commentsList.className = "comments-list";
        commentsList.id = `comments-list-${String(i)}`;
        if (allPosts[i].postComments.length > 0) {
            for (let j = 0; j < allPosts[i].postComments.length; j++) {
                let currentComment = allPosts[i].postComments[j];
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
                        </div>  `;
                const divCommentElements = document.createElement("div");
                divCommentElements.id = "divCommentElements";
                let buttoncommentTOcomment = document.createElement("button");
                let commentLikeSymbol = document.createElement("p");
                buttoncommentTOcomment.textContent = "Comment";
                buttoncommentTOcomment.className = "btn btn-comment text-white";
                buttoncommentTOcomment.addEventListener("click", () => {
                    clickfunc(j);
                });
                commentLikeSymbol.innerHTML = "&#x2661;";
                commentLikeSymbol.id = "commentlikeElement";
                //commentLikeSymbol.id="like"+String(i);
                commentLikeSymbol.addEventListener("click", () => {
                    clickfunc(i);
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
});
function postComment(i) {
    let inputValue = document.getElementById(`comment-${String(i)}`);
    let commentsList = document.getElementById(`comments-list-${String(i)}`);
    let userNameStorege = JSON.parse(localStorage.getItem("currentUser"));
    let d = new Date();
    let timeStampPost = `
        ${d.getHours() < 10 ? "0" + d.getHours() : d.getHours()}
    :
        ${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}
    :
        ${d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()}
    `;
    /*comment likes */
    commentsList.innerHTML += `
        <div class="comment-box">
                <div class="d-flex gap-3">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h6 class="mb-0">${userNameStorege ? userNameStorege.userName : "no user"}</h6>
                            <span class="comment-time">${timeStampPost}</span>
                        </div>
                        <p class="mb-2">${inputValue.value}.</p>
                    </div>
                 </div>
        </div>
           `;
    const divCommentElements = document.createElement("div");
    divCommentElements.id = "divCommentElements";
    let buttoncommentTOcomment = document.createElement("button");
    let commentLikeSymbol = document.createElement("p");
    buttoncommentTOcomment.textContent = "Comment";
    buttoncommentTOcomment.className = "btn btn-comment text-white";
    buttoncommentTOcomment.addEventListener("click", () => {
        clickfunc(i);
    });
    commentLikeSymbol.innerHTML = "&#x2661;";
    commentLikeSymbol.id = "commentlikeElement";
    //commentLikeSymbol.id="like"+String(i);
    commentLikeSymbol.addEventListener("click", () => {
        clickfunc(i);
    });
    //
    //
    //
    //
    //create new Comment interface




    divCommentElements.appendChild(buttoncommentTOcomment);
    divCommentElements.appendChild(commentLikeSymbol);
    commentsList.appendChild(divCommentElements);
    let currentPost = getFromStorage("allPosts", "postId", String(+i + 1));
    let newComment = new MyComment(currentPost.postComments.length + 1, userNameStorege.userName, inputValue.value, timeStampPost);
    currentPost.postComments.push(newComment);
    setToStorage("allPosts", +i, currentPost);
    console.log(currentPost.postComments.length);
    commentLikeSymbol.addEventListener("click", () => {
        console.log(currentPost.postComments.length);
        for (let x = 0; currentPost.postComments.length; x++) {
            console.log(currentPost.postComments[x].commentId);
            console.log(userNameStorege.userId);
            if (currentPost.postComments[x].commentId == userNameStorege.userId) {
                currentPost.postComments[x].commentLikes += 1;
                console.log(currentPost.postComments[x].commentLikes);
                //  commentLike_handler(i)
                commentLikeSymbol.innerHTML = currentPost.postComments[x].commentLikes + "&#x2764";
            }
        }
    });
}
function clickfunc(i) {
    alert(i);
}
function like_handler(i) {
    let currentPost = getFromStorage("allPosts", "postId", String(+i + 1));
    //  let newComment:MyComment=new MyComment((currentPost as Post).postComments.length+1,"Katy C",inputValue.value,timeStampPost);
    if (localStorage.getItem("currentUser")) {
        let userDetails = JSON.parse(localStorage.getItem("currentUser"));
        for (let j = 0; j < currentPost.postLikes.length; j++) {
            /*    -----   like*/
            if (currentPost.postLikes[j].userId == userDetails.userId) {
                console.log(currentPost.postLikes);
                currentPost.postLikes.splice(j, 1);
                console.log(currentPost.postLikes);
                document.getElementById("like" + String(i)).innerHTML =
                    currentPost.postLikes.length + "&#x2661;";
                //postLikeSymbol.innerHTML=(allPosts as Array<any>)[i].postLikes.length>0?
                // (allPosts as Array<any>)[i].postLikes.length +"&#x2764" 
                setToStorage("allPosts", +i, currentPost);
                ``;
                window.location.reload();
                return;
            }
            window.location.reload();
        }
        /*   +++++   like*/
        currentPost.postLikes.push({
            userId: userDetails.userId,
            userName: userDetails.userName
        });
        window.location.reload();
    }
    else {
        currentPost.postLikes.push({
            userId: "no id",
            userName: "no user"
        });
    }
    setToStorage("allPosts", +i, currentPost);
    window.location.reload();
}
let loginLink = document.getElementById("loginLink");
let modal = document.getElementById("modal");
let loginUser = document.getElementById("signInBtn");
let logOutLink = document.getElementById("logOutLink");
//let username = document.getElementById(`userInput`) as HTMLInputElement;
//let username =$("#userInput").val();
//let userid=$("#userId").val();
logOutLink.addEventListener("click", () => {
    alert("log out");
    localStorage.removeItem("currentUser");
});
function loginUserFunc() {
    modal.showModal();
}
loginLink.addEventListener("click", () => {
    loginUserFunc();
});
loginUser.addEventListener("click", () => {
    alert(555);
    //localStorage.setItem("currentUser", JSON.stringify(username.value));
    localStorage.setItem("currentUser", JSON.stringify({
        userName: document.getElementById("userInput").value,
        userId: document.getElementById("userId").value
    }));
    modal.close();
});
