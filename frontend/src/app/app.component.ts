import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { CnnService } from './services/cnn.service';

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

  constructor(private cnnService: CnnService) {}

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

  classifyImage() {
    if (!this.selectedFile) return;

    this.isClassifying = true;

    this.cnnService.classifyImage(this.selectedFile).subscribe({
      next: (res) => {
        this.classificationResult = res.class;
        this.confidence = res.confidence * 100; 
        this.isClassifying = false;
      },
      error: (err) => {
        console.error('Error al clasificar la imagen:', err);
        this.isClassifying = false;
      }
    });
  }

  newClasificacion() {
    this.removeImage();
  }
}
