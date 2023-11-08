from flask import Flask, render_template, request, Response
from flask_cors import CORS
from json import dumps
import cv2


app = Flask(__name__)
CORS(app)


@app.get('/')
def html_template():
    return render_template("index.html")


@app.post('/proccess')
def remap_points():
    x, y = request.json[0]
    image = cv2.imread("static/images/original-draw.jpeg")
    image = cv2.line(image, (int(x), 0), (int(x), image.shape[0] - 1), (0, 255, 0))
    image = cv2.line(image, (0, int(y)), (image.shape[1] - 1, int(y)), (0, 255, 0))
    cv2.imwrite("static/images/processed-draw.jpeg", image)
    return Response(dumps(request.json), 200, {"Content-Type": "application/json"})


app.run(debug=True)
