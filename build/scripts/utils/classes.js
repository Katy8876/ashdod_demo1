export class Post {
    constructor(postId, postAuthor, postTitle, postBody) {
        this.postId = postId;
        this.postAuthor = postAuthor;
        this.postTitle = postTitle;
        this.postBody = postBody;
        this.postLikes = [];
        this.postComments = [];
    }
    addComment(comment) {
        this.postComments.push(comment);
    }
}
export class MyComment {
    constructor(commentId, commentAuthor, commentBody, commentDate) {
        this.commentId = commentId;
        this.commentAuthor = commentAuthor;
        this.commentBody = commentBody;
        this.commentLikes = 0;
        this.commentDate = commentDate;
        this.commentComments = [];
    }
    commentLike() {
        this.commentLikes += 1;
    }
    addComment(comment) {
        this.commentComments.push(comment);
    }
}
export class User {
    constructor() {
        this.personLike = [];
    }
}
