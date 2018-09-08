class BlogNotFoundException(Exception):
    def __init__(self, message):
        self.error = 'Blog cannot be found'
        if message:
            self.error = message