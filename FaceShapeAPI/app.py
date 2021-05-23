from flask import Flask,jsonify, render_template, request 
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage
from keras.preprocessing.image import ImageDataGenerator
from urllib.request import urlopen
from io import BytesIO
from PIL import Image
import tensorflow as tf 
import numpy as np 
import os  
  
model = tf.keras.models.load_model('model/keras_model.h5') 
app = Flask(__name__) 
CORS(app)
  
app.config['UPLOAD_FOLDER'] = './uploaded/image'
  
@app.route('/') 
def upload_f(): 
    return render_template('upload.html') 
  
def finds(): 
    test_datagen = ImageDataGenerator(rescale = 1./255) 
    vals = ['Oblong', 'Heart', 'Round', 'Oval', 'Square']
    test_dir = 'uploaded'
    test_generator = test_datagen.flow_from_directory( 
            test_dir, 
            target_size =(224, 224), 
            color_mode ="rgb", 
            shuffle = False, 
            class_mode ='categorical', 
            batch_size = 1) 
  
    pred = model.predict_generator(test_generator) 
    print(pred) 
    return str(vals[np.argmax(pred)]) 
  
@app.route('/uploader', methods = ['GET', 'POST']) 
@cross_origin()
def upload_file(): 
    if request.method == 'POST': 
        f = request.files['file'] 
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename))) 
        val = finds() 
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename)))
        return jsonify(
            faceshape = val
        )
        #return render_template('pred.html', ss = val)

@app.route('/predict', methods = ['POST']) 
def predict_sign(): 
    if request.method == 'POST': 
        req = request.get_json()
        imageURL = req.get('image_link')

        resource = urlopen(imageURL)
        output = open("./uploaded/image/file01.jpg","wb")
        output.write(resource.read())
        output.close()
        
        val = finds() 
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename("file01.jpg")))
        return 'You look like a ' + val

 
  
if __name__ == '__main__': 
    app.run() 
