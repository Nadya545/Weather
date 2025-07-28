type Listener = (isLoading: boolean) => void;

class LoaderEventEmitter {
  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  emit(isLoading: boolean) {
    this.listeners.forEach((listener) => listener(isLoading));
  }
}

export const loaderEventEmitter = new LoaderEventEmitter();
