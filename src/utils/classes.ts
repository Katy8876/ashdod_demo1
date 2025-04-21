
type nAs=(string|number);

export interface comment{
    commentId : nAs,
    commentAuthor : string,
    commentBody : string,
    commentLikes : number,
    commentDate : string
    commentComments : comment[]
}

export interface personLike{
    userName : string,
    userId : nAs,
   
 }

export class Post{
    public postId : nAs;
    public postAuthor : string;
    public postTitle : string;
    public postBody : string;
    public postLikes : personLike[];
    public postComments : comment[];
    public constructor(postId : nAs, postAuthor : string, postTitle : string, postBody : string)
    {
        this.postId = postId;
        this.postAuthor = postAuthor;
        this.postTitle = postTitle;
        this.postBody=postBody;
        this.postLikes=[];
        this.postComments =[];
    }

    public addComment(comment:comment){
        this.postComments.push(comment);
    }
}
 
export class MyComment{
    public commentId : nAs;
    public commentAuthor : string;
    public commentBody : string;
    public commentLikes : number;
    public commentDate :string 
    public commentComments : comment[];
    public constructor(commentId : nAs, commentAuthor : string, commentBody : string, commentDate: string)
    {
        this.commentId=commentId;
        this.commentAuthor=commentAuthor;
        this.commentBody=commentBody;
        this.commentLikes=0;
        this.commentDate=commentDate;
        this.commentComments=[];
    }
    public commentLike(){
        this.commentLikes+=1;
    }
    public addComment(comment:comment){
        this.commentComments.push(comment);
    }
 }

 export class User{
    public personLike: personLike[];
    
    constructor(){
       this.personLike=[];
       
    }
}