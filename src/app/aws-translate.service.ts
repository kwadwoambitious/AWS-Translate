import { Injectable } from '@angular/core';
import {
  TranslateClient,
  TranslateTextCommand,
} from '@aws-sdk/client-translate';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AwsTranslateService {
  private readonly client: TranslateClient;

  constructor() {
    this.client = new TranslateClient({
      region: environment.region,
      credentials: {
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
      },
    });
  }

  async translateText(
    text: string,
    sourceLang: string,
    targetLang: string
  ): Promise<string> {
    if (!text?.trim()) {
      throw new Error('Text to translate cannot be empty');
    }
    if (!sourceLang || !targetLang) {
      throw new Error('Source and target languages must be specified');
    }
    try {
      const command = new TranslateTextCommand({
        Text: text,
        SourceLanguageCode: sourceLang,
        TargetLanguageCode: targetLang,
      });
      const response = await this.client.send(command);
      return response.TranslatedText ?? '';
    } catch (error) {
      console.error('Translation failed:', error);
      throw error;
    }
  }
}
