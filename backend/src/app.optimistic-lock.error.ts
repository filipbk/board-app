// OptimisticLockVersionMismatchError.ts
import { UnprocessableEntityException } from '@nestjs/common';

export class OptimisticLockVersionMismatchError extends UnprocessableEntityException {
  name = 'OptimisticLockVersionMismatchError';

  constructor(entity: string, expectedVersion: number, actualVersion: number) {
    super();
    Reflect.setPrototypeOf(this, OptimisticLockVersionMismatchError.prototype);
    this.message = `The optimistic lock on entity ${entity} failed, version ${expectedVersion} was expected, but is actually ${actualVersion}.`;
  }
}
