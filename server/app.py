from flask import Flask, request, redirect, url_for
import ml_utility
from flask_cors import CORS


app = Flask(__name__, static_url_path='', static_folder='../client/build')
CORS(app)


# landing page / login
@app.route('/')
@app.route('/login')
def login():
    try:
        request.cookies.get['phone']
        return redirect(url_for('dashboard'))
    except:
        pass


# dashboard
@app.route('/dashboard')
def dashboard():
    return {"1": "hello"}


# crop recommendation
@app.route('/user/crop_recommendation', methods=['GET','POST'])
def recommend_crop():
    print(request.json)
    # x = [float(request.form.get(feature)) for feature in request.form]
    x = list(request.json.values())
    model = ml_utility.CropRecommendation()
    print(x)
    crop = model.recommend_crop(X=x) # 90, 42, 43, 20.879744, 82.002744, 6.502985, 202.935536
    return {"crop": crop}

# disease prediction
@app.route('/disease/predict', methods=['POST'])
def predict_disease():
    f = request.files['img']
    f.save("./uploads/test.jpg")
    model = ml_utility.DiseasePrediction()
    pred = model.predict_disease()
    return {"file": f.filename, "pred": pred}

if __name__ == "__main__":
    app.debug(debug=True)