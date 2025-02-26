python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install flask flask-cors pymongo flask-jwt-extended

deactivate

pip install -r requirements.txt
