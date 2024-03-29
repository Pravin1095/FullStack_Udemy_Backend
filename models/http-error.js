class HttpError extends Error{   //inheriting from inbuilt Error class
constructor(message, errorCode){
    super(message) //Add a message property
    this.code=errorCode //Add a code property
}
} 

module.exports=HttpError