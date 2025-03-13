import { Component, inject } from '@angular/core';
import { AwsTranslateService } from './aws-translate.service';
// import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public welcomeText: string = 'Welcome!';
  public isLoading: boolean = false;
  private readonly awsTranslateService = inject(AwsTranslateService);

  async performTranslation() {
    this.isLoading = true;
    try {
      this.welcomeText = await this.awsTranslateService.translateText(
        this.welcomeText,
        'en',
        'fr'
      );
    } catch (error) {
      console.error('Translation failed:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }
}
