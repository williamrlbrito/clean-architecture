import { Entity } from "../../@shared/entity/entity.abstract";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import { NotificationError } from "../../@shared/notification/notification.error";
import CustomerChangeAddressEvent from "../event/customer-change-address.event";
import SendConsoleLogHandler from "../event/handler/send-console-log.handler";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this.id.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Id is required",
      });
    }
    if (this._name.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Name is required",
      });
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;

    const eventDispatcher = new EventDispatcher();
    const consoleHandler = new SendConsoleLogHandler();

    eventDispatcher.register("CustomerChangeAddressEvent", consoleHandler);

    const customerChangeAddress = new CustomerChangeAddressEvent({
      id: this.id,
      name: this.name,
      address: `${this.Address.street}, ${this.Address.number}, ${this.Address.zip}, ${this.Address.city}`,
    });

    eventDispatcher.notify(customerChangeAddress);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
