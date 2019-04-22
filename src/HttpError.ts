export interface ResponseError {
    status: number,
    Message: string,
    error?: Error,
}

export class HttpError extends Error {
    status = 500;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }

    toResponseObject(): ResponseError {
        return {
            status: this.status,
            Message: this.message,
        }
    }

    static internalErrorResponseObject(): ResponseError {
        return {
            status: 500,
            Message: 'Internal error',
        }
    }
}