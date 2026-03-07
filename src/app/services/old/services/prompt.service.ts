import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  private promptData: unknown;

  setPrompt(data: unknown): void {
    this.promptData = data;
    console.log("this.promptDataSet", this.promptData);
  }

  getPrompt(): unknown {
    console.log("this.promptDataGet", this.promptData);
    return this.promptData;
  }

  clearPrompt(): void {
    this.promptData = null;
  }
}
