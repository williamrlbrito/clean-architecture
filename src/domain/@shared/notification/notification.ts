type NotificationError = {
  message: string;
  context: string;
};

class Notification {
  private errors: NotificationError[] = [];

  addError(error: NotificationError) {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  messages(context?: string): string {
    if (context) {
      return this.errors
        .filter((error) => error.context === context)
        .map((error) => `${error.context}: ${error.message}`)
        .join(", ");
    }

    return this.errors
      .map((error) => `${error.context}: ${error.message}`)
      .join(", ");
  }
}

export { Notification, NotificationError };
