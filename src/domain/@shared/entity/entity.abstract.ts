import { Notification } from "../notification/notification";

abstract class Entity {
  protected id: string;
  protected notification: Notification;

  constructor() {
    this.notification = new Notification();
  }
}

export { Entity };
