from flask import Flask, request, redirect, url_for
from ml_utility import CropRecommendation, DiseasePrediction, PricePrediction
from flask_cors import CORS


app = Flask(__name__, static_url_path='', static_folder='../client/build')
CORS(app)


# crop recommendation
@app.route('/user/crop_recommendation', methods=['GET','POST'])
def recommend_crop():
    # print(request.json)
    x = list(request.json.values())
    model = CropRecommendation()
    # print(x)
    crops = model.recommend_crops(X=x).tolist() # 90, 42, 43, 20.879744, 82.002744, 6.502985, 202.935536
    return {"crop": crops}


# disease prediction
@app.route('/user/disease_detection', methods=['POST'])
def predict_disease():
    # print(request.files)
    f = request.files['img']
    f.save("./uploads/test.jpg")
    model = DiseasePrediction()
    pred = model.predict_disease()
    crop, disease = pred.split("___")
    print(crop, disease.replace("_", " "))
    return {"crop": crop.replace("_", " ").strip(), "disease": disease.replace("_", " ").strip()}


# price prediction
@app.route('/user/price_prediction', methods=['POST'])
def predict_price():
    print(request.json)
    crop, date = request.json['crop'].lower(), request.json['date']
    split_date = date.split("-")
    x = [split_date[1], split_date[0]]
    model = PricePrediction(crop)
    price, error = model.predict_price(X=x)
    return {'low': round(price-error, 2), 'high': round(price+error, 2)}


if __name__ == "__main__":
    app.run(debug=True)