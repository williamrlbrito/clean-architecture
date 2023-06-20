import { NotificationErrorProps } from "./notification";

class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super();
  }
}

export { NotificationError };
