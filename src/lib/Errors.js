class UnauthorizedError {}
UnauthorizedError.prototype = Object.create(Error.prototype);

export { UnauthorizedError }
