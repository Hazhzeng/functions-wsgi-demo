class BlogNotFoundException(Exception):
    def __init__(self, message=None):
        self.error = 'Blog cannot be found'
        if message:
            self.error = message


class UserNotFoundException(Exception):
    def __init__(self, message=None):
        self.error = 'User cannot be found'
        if message:
            self.error = message


class AuthorMismatchException(Exception):
    def __init__(self, message=None):
        self.error = 'Blog author does not match current user'
        if message:
            self.error = message