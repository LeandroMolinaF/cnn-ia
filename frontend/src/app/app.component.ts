import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isClassifying = false;
  classificationResult: string | null = null;
  confidence: number = 0;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.classificationResult = null;
      this.confidence = 0;
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.classificationResult = null;
    this.confidence = 0;
  }

  async classifyImage() {
    if (!this.selectedFile) return;

    this.isClassifying = true;

    // Simulación de respuesta, hay que implementar coso de fastapi
    await new Promise(resolve => setTimeout(resolve, 2000));

    const resultados = [
      'Papel', 'Cartón', 'Orgánico', 'Metal', 'Plástico',
      'Vidrio Verde', 'Vidrio Marrón', 'Vidrio Blanco',
      'Ropa', 'Zapatos', 'Baterías', 'Basura General'
    ];

    const random = Math.floor(Math.random() * resultados.length);
    const randomConfidence = 70 + Math.random() * 30;

    this.classificationResult = resultados[random];
    this.confidence = randomConfidence;
    this.isClassifying = false;
  }

  nuevaClasificacion() {
    this.removeImage();
  }
}
