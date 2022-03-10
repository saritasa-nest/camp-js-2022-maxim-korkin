import { PaginationOptions } from './PaginationOptions';

/** Parameters for generating a query, taking into account filtering and sorting. */
export type QueryConstraintParameters = Pick<PaginationOptions, 'valueSearch' | 'orderingMode' | 'orderingField' >;
