

export const errorHandler = (statusCode,message) => {
    const error = new Error();
    error.satusCode = statusCode;
    error.message = message;
    return error;
}