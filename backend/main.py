from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Habilita CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar el modelo entrenado
model = load_model("models/modelo_basura.keras") 
class_names = ['battery', 'biological', 'brown-glass', 'cardboard', 'clothes', 'green-glass',
               'metal', 'paper', 'plastic', 'shoes', 'trash', 'white-glass'] 

@app.post("/predict/")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    img = img.resize((224, 224))

    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)[0]
    predicted_index = np.argmax(predictions)
    confidence = float(predictions[predicted_index])

    return {
        "class": class_names[predicted_index],
        "confidence": round(confidence, 4)
    }
