import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type EventMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Event {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly time?: string | null;
  readonly extension?: string | null;
  readonly organizer: string;
  readonly guests?: string | null;
  readonly attendees?: (string | null)[] | null;
  readonly location?: string | null;
  readonly radius?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Event, EventMetaData>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event, EventMetaData>) => MutableModel<Event, EventMetaData> | void): Event;
}