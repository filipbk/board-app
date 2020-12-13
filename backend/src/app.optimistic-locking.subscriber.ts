import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from 'typeorm';
import { OptimisticLockVersionMismatchError } from './app.optimistic-lock.error';

const EXPECTED_VERSION_METADATA = Symbol();

@EventSubscriber()
export class OptimisticLockingSubscriber implements EntitySubscriberInterface {
  beforeUpdate(event: UpdateEvent<any>) {
    if (event.metadata.versionColumn) {
      const currentVersion = Reflect.get(
        event.entity,
        event.metadata.versionColumn.propertyName,
      );
      const expectedVersionAfterUpdate = currentVersion + 1;

      Reflect.defineMetadata(
        EXPECTED_VERSION_METADATA,
        expectedVersionAfterUpdate,
        event.entity,
      );
    }
  }

  afterUpdate(event: UpdateEvent<any>) {
    if (event.metadata.versionColumn) {
      const expectedVersion = Reflect.getOwnMetadata(
        EXPECTED_VERSION_METADATA,
        event.entity,
      );
      Reflect.deleteMetadata(EXPECTED_VERSION_METADATA, event.entity);

      const actualVersion = Reflect.get(
        event.entity,
        event.metadata.versionColumn.propertyName,
      );

      if (expectedVersion != actualVersion) {
        throw new OptimisticLockVersionMismatchError(
          event.entity,
          expectedVersion,
          actualVersion,
        );
      }
    }
  }
}
