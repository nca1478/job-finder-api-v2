import { TableColumnOptions } from 'typeorm';

export const basicPropertiesMigration: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'uuid',
    isPrimary: true,
    isUnique: true,
    isGenerated: true,
  },
  {
    name: 'createdAt',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP(6)',
  },
  {
    name: 'updatedAt',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  },
  {
    name: 'deletedAt',
    type: 'timestamp',
    isNullable: true,
  },
];
