import { Client } from '@gradio/client';

const GRADIO_API_URL = "aramb-dev/arabic-transcription";

export class GradioService {
  static instance = null;
  client = null;

  static async getInstance() {
    if (!this.instance) {
      this.instance = new GradioService();
      await this.instance.initialize();
    }
    return this.instance;
  }

  async initialize() {
    try {
      this.client = await Client.connect(GRADIO_API_URL);
    } catch (error) {
      console.error('Failed to initialize Gradio client:', error);
      throw new Error('Failed to initialize transcription service');
    }
  }

  async transcribe(audioBlob) {
    if (!this.client) {
      throw new Error('Gradio client not initialized');
    }

    try {
      const result = await this.client.predict("/predict", { 
        param_0: audioBlob,
      });
      
      return result.data;
    } catch (error) {
      console.error('Transcription failed:', error);
      throw new Error('Failed to transcribe audio');
    }
  }
}

export const getGradioService = () => GradioService.getInstance();