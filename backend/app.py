import webbrowser
from flask import Flask,json, request
from person import person
from model.parametros import Parametros
from model.Estadisticas import Estadisticas


from flask_cors import CORS  # This is the magic
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

_parameters = Parametros() 
resultados = []
estadisticas = Estadisticas()

@app.route('/parametros', methods=['GET'])
def get_Parameters():
    response = app.response_class(
        response = _parameters.toJSON(), 
        status = 200, 
        mimetype = 'application/json'
    )
    return response

@app.route('/parametros', methods=['POST']) 
def post_Parameters(): 
    p = Parametros()
    p.fromJSON(request.data)    
    global _parameters
    _parameters = p 
    return "" 

def parseListToJSON(_list):
    result = []
    for item in _list:
        result.append(json.loads(item.toJSON()))
    return json.dumps(result)

if __name__ == '__main__':
    #webbrowser.open('http://127.0.0.1:5000/')
    app.run()