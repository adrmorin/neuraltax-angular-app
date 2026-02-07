import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

    private promptData: any;

    setPrompt(data: any): void {
      this.promptData = data;
      console.log("this.promptDataSet", this.promptData);
    }

    getPrompt(): any {
        console.log("this.promptDataGet", this.promptData);
      return this.promptData;
    }

    clearPrompt(): void {
      this.promptData = null;
    }
}
