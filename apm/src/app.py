import requests
import json
from flask import Flask, send_file, render_template

app = Flask(__name__)

def fetch_data_from_api(api_url):
    response = requests.get(api_url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def save_data_as_json(data, file_path):
    with open(file_path, "w") as output_file:
        json.dump(data, output_file, indent=4)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/convert")
def convert_and_download():
    api_url = "https://api.publicapis.org/entries"  # Replace with your API URL
    output_file_path = "data.json"

    data = fetch_data_from_api(api_url)
    if data:
        save_data_as_json(data, output_file_path)
        return send_file(output_file_path, as_attachment=True)
    else:
        return "Failed to fetch data from the API"

if __name__ == "__main__":
    app.run()
