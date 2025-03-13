import { Component } from '@angular/core';
import { AwsTranslateService } from './aws-translate.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  translatedText: string = '';

  constructor(
    private readonly awsTranslateService: AwsTranslateService,
    private readonly translate: TranslateService
  ) {}

  async performTranslation() {
    // Example: Translate the default language text to Spanish
    const textToTranslate = 'Hello, welcome!';
    this.translatedText = await this.awsTranslateService.translateText(
      textToTranslate,
      'en',
      'zh-tw'
    );
  }
}
