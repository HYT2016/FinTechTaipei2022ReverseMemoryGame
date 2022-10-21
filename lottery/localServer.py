import requests
from bs4 import BeautifulSoup
from flask import Flask
from flask_cors import CORS
from flask import jsonify

app = Flask(__name__)
CORS(app)
@app.route("/")
def getQrCode():
    url = "https://www.tpex.org.tw/storage/fintech2022/qr.php"
    print(url)
    response = requests.get(url)

    soup = BeautifulSoup(response.text, "lxml")
    try:

        src = soup.find("img")["src"]
        src = src.replace('chs=150x150', 'chs=350x350')
        response = {"type": "img", "content": src}
        return jsonify(response)
    except TypeError:
        text = soup.find("body").string
        text += "！"
        response = {"type": "text", "content": text}
        return jsonify(response)


if __name__ == "__main__":
    app.run("localhost", debug = False)

