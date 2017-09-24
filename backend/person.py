import json
class person(object):
    name = ""
    lname = ""
    p = None
    def __init__(self, d:int):
        self.name = "Miguel Ángel " + str(d)
        self.lname = "Campos"

    def toJSON(self):
        return json.dumps(self, default = lambda o:o.__dict__, 
            sort_keys = True, indent = 4)
            