from flask import Flask,jsonify,request
from flask_restful import Resource,Api

import pickle
import numpy as np


import tensorflow as tf
from tensorflow import keras
from keras_preprocessing.sequence import pad_sequences


app = Flask(__name__)
api = Api(app)

class Predictor(Resource):

    def Predictor(self):
        with open("lstm_model/tokenizer_data.pkl", 'rb') as f:
            data = pickle.load(f)
            self.tokenizer = data['tokenizer']
            self.maxlen = data['maxlen']
            self.model = tf.saved_model.load('lstm_model')

    def predict_(self,sentence):
        seq=self.tokenizer.texts_to_sequences([sentence])
        pad_seq=pad_sequences(seq, maxlen=self.maxlen)
        return np.argmax(self.model.predict(pad_seq))

    def get(self):
        return {"hello":'hi'},200

    def post(self):
        self.Predictor()
        review = request.form['review']
        print(review)
        return {'rating':self.predict_(review)}, 200
        

api.add_resource(Predictor,'/')

if __name__=='__main__':
    app.run(debug=True)