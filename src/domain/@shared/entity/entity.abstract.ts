import { Notification } from "../notification/notification";

abstract class Entity {
  protected _id: string;
  public notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }
}

export { Entity };
