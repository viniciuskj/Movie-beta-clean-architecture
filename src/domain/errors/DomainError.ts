
export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends DomainError {
    constructor(entity: string, id?: string) {
        super(`${entity} ${id? `with id ${id}`: ''} not found`);
    }
}

export class ValidationError extends DomainError {
    constructor(message: string) {
        super(message);
    }
}


