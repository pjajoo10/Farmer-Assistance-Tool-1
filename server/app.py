from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return {"1": "hello"}

if __name__ == "__main__":
    app.debug(debug=True)