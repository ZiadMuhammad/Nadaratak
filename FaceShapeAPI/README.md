# AstroFace API ♒️
I created this API just as a little experiment to see if deep learning (Convolutional Neural Networks) could detect your zodiac sign from your image! The model got trained on a dataset that I collected on my own. The dataset consisted of photos of celebrities of different zodiac signs.

This API is made with Python, Keras, TensorFlow and Flask.

# How to use this API?
First of all, you need to download Keras, TensorFlow, and Flask if you don't already have them.

-To download TensorFlow:

```bash
  pip install tensorflow
```

-To download Keras:


```bash
  pip install keras
```

-To download Flask:


```bash
  pip install flask
```

Then clone this repository and through the terminal go to the repository's directory and run the server:

```bash
  python3 app.py
```

To use this API, you can use your browser and navigate to http://localhost:5000 and, from there, you can upload your image and see if the model could detect your zodiac sign! You can also send a POST request to http://localhost:5000/predict with your image's link in the request's body.

Example POST Request's body:

```json
  {
    "image_link": "https://www.gstatic.com/tv/thumb/persons/82335/82335_v9_bb.jpg"
  }
```

Response:
```
  You look like a Taurus
```

# So does it predict my zodiac sign accurately?

Sometimes! However, most of the time, this model does not work accurately, but, interestingly enough, most of the time, it predicts your cusp correctly! So that means, for example, if you are an Aquarius and your date is near to the date of Pisces, it might return Pisces!

Just as a note, this is not a serious project. It's just a little experiment that I have always wanted to conduct!
