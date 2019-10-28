export class ServiceError extends Error {
    constructor(public message: string, public data?: any, public status?: string) {
        super(message);
    }
}