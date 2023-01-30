export interface IResponse {
    success: boolean ;
    data?: object | [];
    message?: string
}

export class ResponseMessage implements IResponse {
    public success: boolean;
    public data: object | [];
    public message: string;

    constructor(success: boolean, data?: object | [], message?: string){
        this.success = success;
        this.data = data ? data : null;
        this.message = message ? message : null;
    }
}