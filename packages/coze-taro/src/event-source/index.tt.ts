import { type RequestConfig, EventName } from './types';
import { BaseEventSource } from './base';

/**
 * Process streaming requests for ByteDance Mini Program
 */
export class EventSource extends BaseEventSource {
  private task: ReturnType<TTCreateEVentSource> | null = null;
  private isAborted = false;

  constructor(private options: RequestConfig) {
    super();
  }

  start() {
    const { url, method, headers, data } = this.options;
    this.task = tt.createEventSource({
      url,
      method,
      header: headers,
      data,
    });
    this.task.onOpen(() => {
      this.trigger(EventName.Open);
    });
    this.task.onMessage(msg => {
      this.trigger(EventName.Chunk, msg);
    });
    this.task.onError(e => {
      const err = e instanceof Error ? e : new Error(e.errMsg ?? 'fail');
      if (this.isAborted) {
        return;
      }
      this.trigger(EventName.Fail, err);
    });
    this.task.onClose(() => {
      this.trigger(EventName.Success);
    });
  }

  abort() {
    if (!this.isAborted) {
      this.isAborted = true;
      this.task?.close();
      // fire "fail" manualy
      this.trigger(EventName.Fail, new Error('abort'));
    }
  }
}
