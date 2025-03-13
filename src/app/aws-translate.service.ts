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
      region: 'us-east-1',
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
    const command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: sourceLang,
      TargetLanguageCode: targetLang,
    });
    const response = await this.client.send(command);
    return response.TranslatedText ?? '';
  }
}
