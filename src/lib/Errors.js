class UnauthorizedError {}
UnauthorizedError.prototype = Object.create(Error.prototype);

class NotFoundError {}
NotFoundError.prototype = Object.create(Error.prototype);

export { UnauthorizedError, NotFoundError }
