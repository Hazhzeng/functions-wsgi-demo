from project import login_manager

class User(object):
    def is_authenticated():
        return True

    def is_active():
        return True

    def is_anonymous():
        return False

    def get_id():
        return \u''

@login_manager.user_loader
def user_loader(user_id):

