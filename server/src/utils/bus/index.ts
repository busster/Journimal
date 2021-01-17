import { EventBus, createEventDefinition } from "ts-bus";

export const EventDefinition = createEventDefinition
export const bus = new EventBus();

// interface IEvent {}

// class BusEvent implements IEvent {

// }

// interface IEventHandler {
//   handle(topic: string, subject: IEvent) : void
// }

// interface IEventBus {
//   subscribe(topic: string, handler: IEventHandler): void;
//   unsubscribe(topic: string, handler: IEventHandler): void;

//   publish(topic: string, subject: IEvent): Promise<void>;
// }

// class EventBus implements IEventBus {
//   defaultTriesCount = 1;
//   handlers: {
//     [key: string]: IEventHandler[],
//   } = {};

//   subscribe(topic: string, handler: IEventHandler): void {
//     if (!this.handlers[topic]) {
//       this.handlers[topic] = []
//     }
//     this.handlers[topic].push(handler);
//   }

//   unsubscribe(topic: string, handler: IEventHandler): void {
//     if (!this.handlers[topic]) {
//       return;
//     }
//     this.handlers[topic] = this.handlers[topic].filter(item => item !== handler);
//   }

//   public async publish(topic: string, subject: IEvent, tries: number = 0): Promise<void> {
//     if (tries === 0) {
//       tries = this.defaultTriesCount;
//     }

//     const receivers = this.getTopicReceivers(topic);

//     // Run promises
//     receivers.map(
//       receiver => this.retryPublish(topic, subject, receiver, tries)
//     );
//   }

//   private getTopicReceivers(topic: string): IEventHandler[] {
//     // Here you can realise logic with regexp
//     // For example if topic notification version hither then 1.1.1
//     if (!this.handlers[topic]) {
//       return [];
//     }

//     return this.handlers[topic];
//   }

//   private retryPublish(topic: string, subject: IEvent, handler: IEventHandler, triesLeft: number) {
//     try {
//       handler.handle(topic, subject);
//     } catch (e) {
//       console.log('error happened');

//       // Here you can log fail
//       triesLeft -= 1;

//       if (triesLeft > 0) {
//         this.retryPublish(topic, subject, handler, triesLeft);
//       }
//     }
//   }
// }