
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model UserCourse
 * 
 */
export type UserCourse = $Result.DefaultSelection<Prisma.$UserCoursePayload>
/**
 * Model Invitation
 * 
 */
export type Invitation = $Result.DefaultSelection<Prisma.$InvitationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserCourseRole: {
  HOST: 'HOST',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT'
};

export type UserCourseRole = (typeof UserCourseRole)[keyof typeof UserCourseRole]


export const InvitationState: {
  PROCESSING: 'PROCESSING',
  SENT: 'SENT',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type InvitationState = (typeof InvitationState)[keyof typeof InvitationState]

}

export type UserCourseRole = $Enums.UserCourseRole

export const UserCourseRole: typeof $Enums.UserCourseRole

export type InvitationState = $Enums.InvitationState

export const InvitationState: typeof $Enums.InvitationState

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Courses
 * const courses = await prisma.course.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Courses
   * const courses = await prisma.course.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs>;

  /**
   * `prisma.userCourse`: Exposes CRUD operations for the **UserCourse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCourses
    * const userCourses = await prisma.userCourse.findMany()
    * ```
    */
  get userCourse(): Prisma.UserCourseDelegate<ExtArgs>;

  /**
   * `prisma.invitation`: Exposes CRUD operations for the **Invitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invitations
    * const invitations = await prisma.invitation.findMany()
    * ```
    */
  get invitation(): Prisma.InvitationDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.6.0
   * Query Engine version: e95e739751f42d8ca026f6b910f5a2dc5adeaeee
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Course: 'Course',
    UserCourse: 'UserCourse',
    Invitation: 'Invitation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'course' | 'userCourse' | 'invitation'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>,
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      UserCourse: {
        payload: Prisma.$UserCoursePayload<ExtArgs>
        fields: Prisma.UserCourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCourseFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserCoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCourseFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserCoursePayload>
          }
          findFirst: {
            args: Prisma.UserCourseFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserCoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCourseFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserCoursePayload>
          }
          findMany: {
            args: Prisma.UserCourseFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserCoursePayload>[]
          }
          create: {
            args: Prisma.UserCourseCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserCoursePayload>
          }
          createMany: {
            args: Prisma.UserCourseCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserCourseDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserCoursePayload>
          }
          update: {
            args: Prisma.UserCourseUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserCoursePayload>
          }
          deleteMany: {
            args: Prisma.UserCourseDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserCourseUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserCourseUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserCoursePayload>
          }
          aggregate: {
            args: Prisma.UserCourseAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserCourse>
          }
          groupBy: {
            args: Prisma.UserCourseGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserCourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCourseCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCourseCountAggregateOutputType> | number
          }
        }
      }
      Invitation: {
        payload: Prisma.$InvitationPayload<ExtArgs>
        fields: Prisma.InvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvitationFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvitationFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findFirst: {
            args: Prisma.InvitationFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvitationFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          findMany: {
            args: Prisma.InvitationFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>[]
          }
          create: {
            args: Prisma.InvitationCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          createMany: {
            args: Prisma.InvitationCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.InvitationDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          update: {
            args: Prisma.InvitationUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          deleteMany: {
            args: Prisma.InvitationDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.InvitationUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.InvitationUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InvitationPayload>
          }
          aggregate: {
            args: Prisma.InvitationAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateInvitation>
          }
          groupBy: {
            args: Prisma.InvitationGroupByArgs<ExtArgs>,
            result: $Utils.Optional<InvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvitationCountArgs<ExtArgs>,
            result: $Utils.Optional<InvitationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    invitations: number
    attendees: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitations?: boolean | CourseCountOutputTypeCountInvitationsArgs
    attendees?: boolean | CourseCountOutputTypeCountAttendeesArgs
  }

  // Custom InputTypes

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
  }


  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountAttendeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCourseWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    name: string | null
    desc: string | null
    code: string | null
    background: string | null
    createdAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    desc: string | null
    code: string | null
    background: string | null
    createdAt: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    name: number
    desc: number
    code: number
    background: number
    createdAt: number
    _all: number
  }


  export type CourseMinAggregateInputType = {
    id?: true
    name?: true
    desc?: true
    code?: true
    background?: true
    createdAt?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    name?: true
    desc?: true
    code?: true
    background?: true
    createdAt?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    name?: true
    desc?: true
    code?: true
    background?: true
    createdAt?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    name: string
    desc: string | null
    code: string
    background: string | null
    createdAt: Date
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    desc?: boolean
    code?: boolean
    background?: boolean
    createdAt?: boolean
    invitations?: boolean | Course$invitationsArgs<ExtArgs>
    attendees?: boolean | Course$attendeesArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    name?: boolean
    desc?: boolean
    code?: boolean
    background?: boolean
    createdAt?: boolean
  }

  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invitations?: boolean | Course$invitationsArgs<ExtArgs>
    attendees?: boolean | Course$attendeesArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      invitations: Prisma.$InvitationPayload<ExtArgs>[]
      attendees: Prisma.$UserCoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      desc: string | null
      code: string
      background: string | null
      createdAt: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }


  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CourseFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>
    ): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Course that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CourseFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>
    ): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CourseFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
    **/
    create<T extends CourseCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CourseCreateArgs<ExtArgs>>
    ): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Courses.
     *     @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     *     @example
     *     // Create many Courses
     *     const course = await prisma.course.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CourseCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
    **/
    delete<T extends CourseDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>
    ): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CourseUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>
    ): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CourseDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CourseUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
    **/
    upsert<T extends CourseUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>
    ): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    invitations<T extends Course$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Course$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'findMany'> | Null>;

    attendees<T extends Course$attendeesArgs<ExtArgs> = {}>(args?: Subset<T, Course$attendeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Course model
   */ 
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly name: FieldRef<"Course", 'String'>
    readonly desc: FieldRef<"Course", 'String'>
    readonly code: FieldRef<"Course", 'String'>
    readonly background: FieldRef<"Course", 'String'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }


  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }


  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }


  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }


  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }


  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }


  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }


  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
  }


  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }


  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }


  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
  }


  /**
   * Course.invitations
   */
  export type Course$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    cursor?: InvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }


  /**
   * Course.attendees
   */
  export type Course$attendeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    where?: UserCourseWhereInput
    orderBy?: UserCourseOrderByWithRelationInput | UserCourseOrderByWithRelationInput[]
    cursor?: UserCourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCourseScalarFieldEnum | UserCourseScalarFieldEnum[]
  }


  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CourseInclude<ExtArgs> | null
  }



  /**
   * Model UserCourse
   */

  export type AggregateUserCourse = {
    _count: UserCourseCountAggregateOutputType | null
    _min: UserCourseMinAggregateOutputType | null
    _max: UserCourseMaxAggregateOutputType | null
  }

  export type UserCourseMinAggregateOutputType = {
    userId: string | null
    courseId: string | null
    role: $Enums.UserCourseRole | null
    invitationId: string | null
    joinedAt: Date | null
  }

  export type UserCourseMaxAggregateOutputType = {
    userId: string | null
    courseId: string | null
    role: $Enums.UserCourseRole | null
    invitationId: string | null
    joinedAt: Date | null
  }

  export type UserCourseCountAggregateOutputType = {
    userId: number
    courseId: number
    role: number
    invitationId: number
    joinedAt: number
    _all: number
  }


  export type UserCourseMinAggregateInputType = {
    userId?: true
    courseId?: true
    role?: true
    invitationId?: true
    joinedAt?: true
  }

  export type UserCourseMaxAggregateInputType = {
    userId?: true
    courseId?: true
    role?: true
    invitationId?: true
    joinedAt?: true
  }

  export type UserCourseCountAggregateInputType = {
    userId?: true
    courseId?: true
    role?: true
    invitationId?: true
    joinedAt?: true
    _all?: true
  }

  export type UserCourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCourse to aggregate.
     */
    where?: UserCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCourses to fetch.
     */
    orderBy?: UserCourseOrderByWithRelationInput | UserCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCourses
    **/
    _count?: true | UserCourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCourseMaxAggregateInputType
  }

  export type GetUserCourseAggregateType<T extends UserCourseAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCourse[P]>
      : GetScalarType<T[P], AggregateUserCourse[P]>
  }




  export type UserCourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCourseWhereInput
    orderBy?: UserCourseOrderByWithAggregationInput | UserCourseOrderByWithAggregationInput[]
    by: UserCourseScalarFieldEnum[] | UserCourseScalarFieldEnum
    having?: UserCourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCourseCountAggregateInputType | true
    _min?: UserCourseMinAggregateInputType
    _max?: UserCourseMaxAggregateInputType
  }

  export type UserCourseGroupByOutputType = {
    userId: string
    courseId: string
    role: $Enums.UserCourseRole
    invitationId: string | null
    joinedAt: Date
    _count: UserCourseCountAggregateOutputType | null
    _min: UserCourseMinAggregateOutputType | null
    _max: UserCourseMaxAggregateOutputType | null
  }

  type GetUserCourseGroupByPayload<T extends UserCourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCourseGroupByOutputType[P]>
            : GetScalarType<T[P], UserCourseGroupByOutputType[P]>
        }
      >
    >


  export type UserCourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    courseId?: boolean
    role?: boolean
    invitationId?: boolean
    joinedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    invitation?: boolean | UserCourse$invitationArgs<ExtArgs>
  }, ExtArgs["result"]["userCourse"]>

  export type UserCourseSelectScalar = {
    userId?: boolean
    courseId?: boolean
    role?: boolean
    invitationId?: boolean
    joinedAt?: boolean
  }

  export type UserCourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    invitation?: boolean | UserCourse$invitationArgs<ExtArgs>
  }


  export type $UserCoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCourse"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      invitation: Prisma.$InvitationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      courseId: string
      role: $Enums.UserCourseRole
      invitationId: string | null
      joinedAt: Date
    }, ExtArgs["result"]["userCourse"]>
    composites: {}
  }


  type UserCourseGetPayload<S extends boolean | null | undefined | UserCourseDefaultArgs> = $Result.GetResult<Prisma.$UserCoursePayload, S>

  type UserCourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserCourseFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: UserCourseCountAggregateInputType | true
    }

  export interface UserCourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCourse'], meta: { name: 'UserCourse' } }
    /**
     * Find zero or one UserCourse that matches the filter.
     * @param {UserCourseFindUniqueArgs} args - Arguments to find a UserCourse
     * @example
     * // Get one UserCourse
     * const userCourse = await prisma.userCourse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserCourseFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserCourseFindUniqueArgs<ExtArgs>>
    ): Prisma__UserCourseClient<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserCourse that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserCourseFindUniqueOrThrowArgs} args - Arguments to find a UserCourse
     * @example
     * // Get one UserCourse
     * const userCourse = await prisma.userCourse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserCourseFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCourseFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserCourseClient<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserCourse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCourseFindFirstArgs} args - Arguments to find a UserCourse
     * @example
     * // Get one UserCourse
     * const userCourse = await prisma.userCourse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserCourseFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCourseFindFirstArgs<ExtArgs>>
    ): Prisma__UserCourseClient<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserCourse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCourseFindFirstOrThrowArgs} args - Arguments to find a UserCourse
     * @example
     * // Get one UserCourse
     * const userCourse = await prisma.userCourse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserCourseFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCourseFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserCourseClient<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserCourses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCourseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCourses
     * const userCourses = await prisma.userCourse.findMany()
     * 
     * // Get first 10 UserCourses
     * const userCourses = await prisma.userCourse.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userCourseWithUserIdOnly = await prisma.userCourse.findMany({ select: { userId: true } })
     * 
    **/
    findMany<T extends UserCourseFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCourseFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserCourse.
     * @param {UserCourseCreateArgs} args - Arguments to create a UserCourse.
     * @example
     * // Create one UserCourse
     * const UserCourse = await prisma.userCourse.create({
     *   data: {
     *     // ... data to create a UserCourse
     *   }
     * })
     * 
    **/
    create<T extends UserCourseCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCourseCreateArgs<ExtArgs>>
    ): Prisma__UserCourseClient<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserCourses.
     *     @param {UserCourseCreateManyArgs} args - Arguments to create many UserCourses.
     *     @example
     *     // Create many UserCourses
     *     const userCourse = await prisma.userCourse.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCourseCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCourseCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserCourse.
     * @param {UserCourseDeleteArgs} args - Arguments to delete one UserCourse.
     * @example
     * // Delete one UserCourse
     * const UserCourse = await prisma.userCourse.delete({
     *   where: {
     *     // ... filter to delete one UserCourse
     *   }
     * })
     * 
    **/
    delete<T extends UserCourseDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserCourseDeleteArgs<ExtArgs>>
    ): Prisma__UserCourseClient<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserCourse.
     * @param {UserCourseUpdateArgs} args - Arguments to update one UserCourse.
     * @example
     * // Update one UserCourse
     * const userCourse = await prisma.userCourse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserCourseUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCourseUpdateArgs<ExtArgs>>
    ): Prisma__UserCourseClient<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserCourses.
     * @param {UserCourseDeleteManyArgs} args - Arguments to filter UserCourses to delete.
     * @example
     * // Delete a few UserCourses
     * const { count } = await prisma.userCourse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserCourseDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCourseDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCourses
     * const userCourse = await prisma.userCourse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserCourseUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserCourseUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserCourse.
     * @param {UserCourseUpsertArgs} args - Arguments to update or create a UserCourse.
     * @example
     * // Update or create a UserCourse
     * const userCourse = await prisma.userCourse.upsert({
     *   create: {
     *     // ... data to create a UserCourse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCourse we want to update
     *   }
     * })
    **/
    upsert<T extends UserCourseUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserCourseUpsertArgs<ExtArgs>>
    ): Prisma__UserCourseClient<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of UserCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCourseCountArgs} args - Arguments to filter UserCourses to count.
     * @example
     * // Count the number of UserCourses
     * const count = await prisma.userCourse.count({
     *   where: {
     *     // ... the filter for the UserCourses we want to count
     *   }
     * })
    **/
    count<T extends UserCourseCountArgs>(
      args?: Subset<T, UserCourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCourse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserCourseAggregateArgs>(args: Subset<T, UserCourseAggregateArgs>): Prisma.PrismaPromise<GetUserCourseAggregateType<T>>

    /**
     * Group by UserCourse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserCourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCourseGroupByArgs['orderBy'] }
        : { orderBy?: UserCourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserCourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCourse model
   */
  readonly fields: UserCourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCourse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    invitation<T extends UserCourse$invitationArgs<ExtArgs> = {}>(args?: Subset<T, UserCourse$invitationArgs<ExtArgs>>): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the UserCourse model
   */ 
  interface UserCourseFieldRefs {
    readonly userId: FieldRef<"UserCourse", 'String'>
    readonly courseId: FieldRef<"UserCourse", 'String'>
    readonly role: FieldRef<"UserCourse", 'UserCourseRole'>
    readonly invitationId: FieldRef<"UserCourse", 'String'>
    readonly joinedAt: FieldRef<"UserCourse", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * UserCourse findUnique
   */
  export type UserCourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    /**
     * Filter, which UserCourse to fetch.
     */
    where: UserCourseWhereUniqueInput
  }


  /**
   * UserCourse findUniqueOrThrow
   */
  export type UserCourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    /**
     * Filter, which UserCourse to fetch.
     */
    where: UserCourseWhereUniqueInput
  }


  /**
   * UserCourse findFirst
   */
  export type UserCourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    /**
     * Filter, which UserCourse to fetch.
     */
    where?: UserCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCourses to fetch.
     */
    orderBy?: UserCourseOrderByWithRelationInput | UserCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCourses.
     */
    cursor?: UserCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCourses.
     */
    distinct?: UserCourseScalarFieldEnum | UserCourseScalarFieldEnum[]
  }


  /**
   * UserCourse findFirstOrThrow
   */
  export type UserCourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    /**
     * Filter, which UserCourse to fetch.
     */
    where?: UserCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCourses to fetch.
     */
    orderBy?: UserCourseOrderByWithRelationInput | UserCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCourses.
     */
    cursor?: UserCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCourses.
     */
    distinct?: UserCourseScalarFieldEnum | UserCourseScalarFieldEnum[]
  }


  /**
   * UserCourse findMany
   */
  export type UserCourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    /**
     * Filter, which UserCourses to fetch.
     */
    where?: UserCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCourses to fetch.
     */
    orderBy?: UserCourseOrderByWithRelationInput | UserCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCourses.
     */
    cursor?: UserCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCourses.
     */
    skip?: number
    distinct?: UserCourseScalarFieldEnum | UserCourseScalarFieldEnum[]
  }


  /**
   * UserCourse create
   */
  export type UserCourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    /**
     * The data needed to create a UserCourse.
     */
    data: XOR<UserCourseCreateInput, UserCourseUncheckedCreateInput>
  }


  /**
   * UserCourse createMany
   */
  export type UserCourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCourses.
     */
    data: UserCourseCreateManyInput | UserCourseCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * UserCourse update
   */
  export type UserCourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    /**
     * The data needed to update a UserCourse.
     */
    data: XOR<UserCourseUpdateInput, UserCourseUncheckedUpdateInput>
    /**
     * Choose, which UserCourse to update.
     */
    where: UserCourseWhereUniqueInput
  }


  /**
   * UserCourse updateMany
   */
  export type UserCourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCourses.
     */
    data: XOR<UserCourseUpdateManyMutationInput, UserCourseUncheckedUpdateManyInput>
    /**
     * Filter which UserCourses to update
     */
    where?: UserCourseWhereInput
  }


  /**
   * UserCourse upsert
   */
  export type UserCourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    /**
     * The filter to search for the UserCourse to update in case it exists.
     */
    where: UserCourseWhereUniqueInput
    /**
     * In case the UserCourse found by the `where` argument doesn't exist, create a new UserCourse with this data.
     */
    create: XOR<UserCourseCreateInput, UserCourseUncheckedCreateInput>
    /**
     * In case the UserCourse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCourseUpdateInput, UserCourseUncheckedUpdateInput>
  }


  /**
   * UserCourse delete
   */
  export type UserCourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    /**
     * Filter which UserCourse to delete.
     */
    where: UserCourseWhereUniqueInput
  }


  /**
   * UserCourse deleteMany
   */
  export type UserCourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCourses to delete
     */
    where?: UserCourseWhereInput
  }


  /**
   * UserCourse.invitation
   */
  export type UserCourse$invitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    where?: InvitationWhereInput
  }


  /**
   * UserCourse without action
   */
  export type UserCourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
  }



  /**
   * Model Invitation
   */

  export type AggregateInvitation = {
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  export type InvitationMinAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.UserCourseRole | null
    invitedBy: string | null
    courseId: string | null
    state: $Enums.InvitationState | null
    createdAt: Date | null
  }

  export type InvitationMaxAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.UserCourseRole | null
    invitedBy: string | null
    courseId: string | null
    state: $Enums.InvitationState | null
    createdAt: Date | null
  }

  export type InvitationCountAggregateOutputType = {
    id: number
    email: number
    role: number
    invitedBy: number
    courseId: number
    state: number
    createdAt: number
    _all: number
  }


  export type InvitationMinAggregateInputType = {
    id?: true
    email?: true
    role?: true
    invitedBy?: true
    courseId?: true
    state?: true
    createdAt?: true
  }

  export type InvitationMaxAggregateInputType = {
    id?: true
    email?: true
    role?: true
    invitedBy?: true
    courseId?: true
    state?: true
    createdAt?: true
  }

  export type InvitationCountAggregateInputType = {
    id?: true
    email?: true
    role?: true
    invitedBy?: true
    courseId?: true
    state?: true
    createdAt?: true
    _all?: true
  }

  export type InvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitation to aggregate.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invitations
    **/
    _count?: true | InvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvitationMaxAggregateInputType
  }

  export type GetInvitationAggregateType<T extends InvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvitation[P]>
      : GetScalarType<T[P], AggregateInvitation[P]>
  }




  export type InvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvitationWhereInput
    orderBy?: InvitationOrderByWithAggregationInput | InvitationOrderByWithAggregationInput[]
    by: InvitationScalarFieldEnum[] | InvitationScalarFieldEnum
    having?: InvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvitationCountAggregateInputType | true
    _min?: InvitationMinAggregateInputType
    _max?: InvitationMaxAggregateInputType
  }

  export type InvitationGroupByOutputType = {
    id: string
    email: string
    role: $Enums.UserCourseRole
    invitedBy: string
    courseId: string
    state: $Enums.InvitationState
    createdAt: Date
    _count: InvitationCountAggregateOutputType | null
    _min: InvitationMinAggregateOutputType | null
    _max: InvitationMaxAggregateOutputType | null
  }

  type GetInvitationGroupByPayload<T extends InvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvitationGroupByOutputType[P]>
            : GetScalarType<T[P], InvitationGroupByOutputType[P]>
        }
      >
    >


  export type InvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    invitedBy?: boolean
    courseId?: boolean
    state?: boolean
    createdAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    attendee?: boolean | Invitation$attendeeArgs<ExtArgs>
  }, ExtArgs["result"]["invitation"]>

  export type InvitationSelectScalar = {
    id?: boolean
    email?: boolean
    role?: boolean
    invitedBy?: boolean
    courseId?: boolean
    state?: boolean
    createdAt?: boolean
  }

  export type InvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    attendee?: boolean | Invitation$attendeeArgs<ExtArgs>
  }


  export type $InvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invitation"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      attendee: Prisma.$UserCoursePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      role: $Enums.UserCourseRole
      invitedBy: string
      courseId: string
      state: $Enums.InvitationState
      createdAt: Date
    }, ExtArgs["result"]["invitation"]>
    composites: {}
  }


  type InvitationGetPayload<S extends boolean | null | undefined | InvitationDefaultArgs> = $Result.GetResult<Prisma.$InvitationPayload, S>

  type InvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InvitationFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: InvitationCountAggregateInputType | true
    }

  export interface InvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invitation'], meta: { name: 'Invitation' } }
    /**
     * Find zero or one Invitation that matches the filter.
     * @param {InvitationFindUniqueArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InvitationFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, InvitationFindUniqueArgs<ExtArgs>>
    ): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Invitation that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {InvitationFindUniqueOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InvitationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, InvitationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Invitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InvitationFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, InvitationFindFirstArgs<ExtArgs>>
    ): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Invitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindFirstOrThrowArgs} args - Arguments to find a Invitation
     * @example
     * // Get one Invitation
     * const invitation = await prisma.invitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InvitationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, InvitationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invitations
     * const invitations = await prisma.invitation.findMany()
     * 
     * // Get first 10 Invitations
     * const invitations = await prisma.invitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invitationWithIdOnly = await prisma.invitation.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends InvitationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InvitationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Invitation.
     * @param {InvitationCreateArgs} args - Arguments to create a Invitation.
     * @example
     * // Create one Invitation
     * const Invitation = await prisma.invitation.create({
     *   data: {
     *     // ... data to create a Invitation
     *   }
     * })
     * 
    **/
    create<T extends InvitationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, InvitationCreateArgs<ExtArgs>>
    ): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Invitations.
     *     @param {InvitationCreateManyArgs} args - Arguments to create many Invitations.
     *     @example
     *     // Create many Invitations
     *     const invitation = await prisma.invitation.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends InvitationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InvitationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Invitation.
     * @param {InvitationDeleteArgs} args - Arguments to delete one Invitation.
     * @example
     * // Delete one Invitation
     * const Invitation = await prisma.invitation.delete({
     *   where: {
     *     // ... filter to delete one Invitation
     *   }
     * })
     * 
    **/
    delete<T extends InvitationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, InvitationDeleteArgs<ExtArgs>>
    ): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Invitation.
     * @param {InvitationUpdateArgs} args - Arguments to update one Invitation.
     * @example
     * // Update one Invitation
     * const invitation = await prisma.invitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InvitationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, InvitationUpdateArgs<ExtArgs>>
    ): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Invitations.
     * @param {InvitationDeleteManyArgs} args - Arguments to filter Invitations to delete.
     * @example
     * // Delete a few Invitations
     * const { count } = await prisma.invitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InvitationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InvitationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invitations
     * const invitation = await prisma.invitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InvitationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, InvitationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Invitation.
     * @param {InvitationUpsertArgs} args - Arguments to update or create a Invitation.
     * @example
     * // Update or create a Invitation
     * const invitation = await prisma.invitation.upsert({
     *   create: {
     *     // ... data to create a Invitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invitation we want to update
     *   }
     * })
    **/
    upsert<T extends InvitationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, InvitationUpsertArgs<ExtArgs>>
    ): Prisma__InvitationClient<$Result.GetResult<Prisma.$InvitationPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationCountArgs} args - Arguments to filter Invitations to count.
     * @example
     * // Count the number of Invitations
     * const count = await prisma.invitation.count({
     *   where: {
     *     // ... the filter for the Invitations we want to count
     *   }
     * })
    **/
    count<T extends InvitationCountArgs>(
      args?: Subset<T, InvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvitationAggregateArgs>(args: Subset<T, InvitationAggregateArgs>): Prisma.PrismaPromise<GetInvitationAggregateType<T>>

    /**
     * Group by Invitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvitationGroupByArgs['orderBy'] }
        : { orderBy?: InvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invitation model
   */
  readonly fields: InvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    attendee<T extends Invitation$attendeeArgs<ExtArgs> = {}>(args?: Subset<T, Invitation$attendeeArgs<ExtArgs>>): Prisma__UserCourseClient<$Result.GetResult<Prisma.$UserCoursePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Invitation model
   */ 
  interface InvitationFieldRefs {
    readonly id: FieldRef<"Invitation", 'String'>
    readonly email: FieldRef<"Invitation", 'String'>
    readonly role: FieldRef<"Invitation", 'UserCourseRole'>
    readonly invitedBy: FieldRef<"Invitation", 'String'>
    readonly courseId: FieldRef<"Invitation", 'String'>
    readonly state: FieldRef<"Invitation", 'InvitationState'>
    readonly createdAt: FieldRef<"Invitation", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Invitation findUnique
   */
  export type InvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }


  /**
   * Invitation findUniqueOrThrow
   */
  export type InvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where: InvitationWhereUniqueInput
  }


  /**
   * Invitation findFirst
   */
  export type InvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }


  /**
   * Invitation findFirstOrThrow
   */
  export type InvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitation to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invitations.
     */
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }


  /**
   * Invitation findMany
   */
  export type InvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter, which Invitations to fetch.
     */
    where?: InvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invitations to fetch.
     */
    orderBy?: InvitationOrderByWithRelationInput | InvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invitations.
     */
    cursor?: InvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invitations.
     */
    skip?: number
    distinct?: InvitationScalarFieldEnum | InvitationScalarFieldEnum[]
  }


  /**
   * Invitation create
   */
  export type InvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a Invitation.
     */
    data: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
  }


  /**
   * Invitation createMany
   */
  export type InvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invitations.
     */
    data: InvitationCreateManyInput | InvitationCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Invitation update
   */
  export type InvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a Invitation.
     */
    data: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
    /**
     * Choose, which Invitation to update.
     */
    where: InvitationWhereUniqueInput
  }


  /**
   * Invitation updateMany
   */
  export type InvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invitations.
     */
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyInput>
    /**
     * Filter which Invitations to update
     */
    where?: InvitationWhereInput
  }


  /**
   * Invitation upsert
   */
  export type InvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the Invitation to update in case it exists.
     */
    where: InvitationWhereUniqueInput
    /**
     * In case the Invitation found by the `where` argument doesn't exist, create a new Invitation with this data.
     */
    create: XOR<InvitationCreateInput, InvitationUncheckedCreateInput>
    /**
     * In case the Invitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvitationUpdateInput, InvitationUncheckedUpdateInput>
  }


  /**
   * Invitation delete
   */
  export type InvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
    /**
     * Filter which Invitation to delete.
     */
    where: InvitationWhereUniqueInput
  }


  /**
   * Invitation deleteMany
   */
  export type InvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invitations to delete
     */
    where?: InvitationWhereInput
  }


  /**
   * Invitation.attendee
   */
  export type Invitation$attendeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCourse
     */
    select?: UserCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserCourseInclude<ExtArgs> | null
    where?: UserCourseWhereInput
  }


  /**
   * Invitation without action
   */
  export type InvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invitation
     */
    select?: InvitationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InvitationInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CourseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    desc: 'desc',
    code: 'code',
    background: 'background',
    createdAt: 'createdAt'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const UserCourseScalarFieldEnum: {
    userId: 'userId',
    courseId: 'courseId',
    role: 'role',
    invitationId: 'invitationId',
    joinedAt: 'joinedAt'
  };

  export type UserCourseScalarFieldEnum = (typeof UserCourseScalarFieldEnum)[keyof typeof UserCourseScalarFieldEnum]


  export const InvitationScalarFieldEnum: {
    id: 'id',
    email: 'email',
    role: 'role',
    invitedBy: 'invitedBy',
    courseId: 'courseId',
    state: 'state',
    createdAt: 'createdAt'
  };

  export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserCourseRole'
   */
  export type EnumUserCourseRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserCourseRole'>
    


  /**
   * Reference to a field of type 'UserCourseRole[]'
   */
  export type ListEnumUserCourseRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserCourseRole[]'>
    


  /**
   * Reference to a field of type 'InvitationState'
   */
  export type EnumInvitationStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationState'>
    


  /**
   * Reference to a field of type 'InvitationState[]'
   */
  export type ListEnumInvitationStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvitationState[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    name?: StringFilter<"Course"> | string
    desc?: StringNullableFilter<"Course"> | string | null
    code?: StringFilter<"Course"> | string
    background?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    invitations?: InvitationListRelationFilter
    attendees?: UserCourseListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrderInput | SortOrder
    code?: SortOrder
    background?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    invitations?: InvitationOrderByRelationAggregateInput
    attendees?: UserCourseOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    name?: StringFilter<"Course"> | string
    desc?: StringNullableFilter<"Course"> | string | null
    code?: StringFilter<"Course"> | string
    background?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    invitations?: InvitationListRelationFilter
    attendees?: UserCourseListRelationFilter
  }, "id">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrderInput | SortOrder
    code?: SortOrder
    background?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    name?: StringWithAggregatesFilter<"Course"> | string
    desc?: StringNullableWithAggregatesFilter<"Course"> | string | null
    code?: StringWithAggregatesFilter<"Course"> | string
    background?: StringNullableWithAggregatesFilter<"Course"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type UserCourseWhereInput = {
    AND?: UserCourseWhereInput | UserCourseWhereInput[]
    OR?: UserCourseWhereInput[]
    NOT?: UserCourseWhereInput | UserCourseWhereInput[]
    userId?: StringFilter<"UserCourse"> | string
    courseId?: StringFilter<"UserCourse"> | string
    role?: EnumUserCourseRoleFilter<"UserCourse"> | $Enums.UserCourseRole
    invitationId?: StringNullableFilter<"UserCourse"> | string | null
    joinedAt?: DateTimeFilter<"UserCourse"> | Date | string
    course?: XOR<CourseRelationFilter, CourseWhereInput>
    invitation?: XOR<InvitationNullableRelationFilter, InvitationWhereInput> | null
  }

  export type UserCourseOrderByWithRelationInput = {
    userId?: SortOrder
    courseId?: SortOrder
    role?: SortOrder
    invitationId?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    course?: CourseOrderByWithRelationInput
    invitation?: InvitationOrderByWithRelationInput
  }

  export type UserCourseWhereUniqueInput = Prisma.AtLeast<{
    invitationId?: string
    userId_courseId?: UserCourseUserIdCourseIdCompoundUniqueInput
    AND?: UserCourseWhereInput | UserCourseWhereInput[]
    OR?: UserCourseWhereInput[]
    NOT?: UserCourseWhereInput | UserCourseWhereInput[]
    userId?: StringFilter<"UserCourse"> | string
    courseId?: StringFilter<"UserCourse"> | string
    role?: EnumUserCourseRoleFilter<"UserCourse"> | $Enums.UserCourseRole
    joinedAt?: DateTimeFilter<"UserCourse"> | Date | string
    course?: XOR<CourseRelationFilter, CourseWhereInput>
    invitation?: XOR<InvitationNullableRelationFilter, InvitationWhereInput> | null
  }, "userId_courseId" | "invitationId">

  export type UserCourseOrderByWithAggregationInput = {
    userId?: SortOrder
    courseId?: SortOrder
    role?: SortOrder
    invitationId?: SortOrderInput | SortOrder
    joinedAt?: SortOrder
    _count?: UserCourseCountOrderByAggregateInput
    _max?: UserCourseMaxOrderByAggregateInput
    _min?: UserCourseMinOrderByAggregateInput
  }

  export type UserCourseScalarWhereWithAggregatesInput = {
    AND?: UserCourseScalarWhereWithAggregatesInput | UserCourseScalarWhereWithAggregatesInput[]
    OR?: UserCourseScalarWhereWithAggregatesInput[]
    NOT?: UserCourseScalarWhereWithAggregatesInput | UserCourseScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserCourse"> | string
    courseId?: StringWithAggregatesFilter<"UserCourse"> | string
    role?: EnumUserCourseRoleWithAggregatesFilter<"UserCourse"> | $Enums.UserCourseRole
    invitationId?: StringNullableWithAggregatesFilter<"UserCourse"> | string | null
    joinedAt?: DateTimeWithAggregatesFilter<"UserCourse"> | Date | string
  }

  export type InvitationWhereInput = {
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    id?: StringFilter<"Invitation"> | string
    email?: StringFilter<"Invitation"> | string
    role?: EnumUserCourseRoleFilter<"Invitation"> | $Enums.UserCourseRole
    invitedBy?: StringFilter<"Invitation"> | string
    courseId?: StringFilter<"Invitation"> | string
    state?: EnumInvitationStateFilter<"Invitation"> | $Enums.InvitationState
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    course?: XOR<CourseRelationFilter, CourseWhereInput>
    attendee?: XOR<UserCourseNullableRelationFilter, UserCourseWhereInput> | null
  }

  export type InvitationOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    invitedBy?: SortOrder
    courseId?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
    course?: CourseOrderByWithRelationInput
    attendee?: UserCourseOrderByWithRelationInput
  }

  export type InvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvitationWhereInput | InvitationWhereInput[]
    OR?: InvitationWhereInput[]
    NOT?: InvitationWhereInput | InvitationWhereInput[]
    email?: StringFilter<"Invitation"> | string
    role?: EnumUserCourseRoleFilter<"Invitation"> | $Enums.UserCourseRole
    invitedBy?: StringFilter<"Invitation"> | string
    courseId?: StringFilter<"Invitation"> | string
    state?: EnumInvitationStateFilter<"Invitation"> | $Enums.InvitationState
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
    course?: XOR<CourseRelationFilter, CourseWhereInput>
    attendee?: XOR<UserCourseNullableRelationFilter, UserCourseWhereInput> | null
  }, "id">

  export type InvitationOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    invitedBy?: SortOrder
    courseId?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
    _count?: InvitationCountOrderByAggregateInput
    _max?: InvitationMaxOrderByAggregateInput
    _min?: InvitationMinOrderByAggregateInput
  }

  export type InvitationScalarWhereWithAggregatesInput = {
    AND?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    OR?: InvitationScalarWhereWithAggregatesInput[]
    NOT?: InvitationScalarWhereWithAggregatesInput | InvitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invitation"> | string
    email?: StringWithAggregatesFilter<"Invitation"> | string
    role?: EnumUserCourseRoleWithAggregatesFilter<"Invitation"> | $Enums.UserCourseRole
    invitedBy?: StringWithAggregatesFilter<"Invitation"> | string
    courseId?: StringWithAggregatesFilter<"Invitation"> | string
    state?: EnumInvitationStateWithAggregatesFilter<"Invitation"> | $Enums.InvitationState
    createdAt?: DateTimeWithAggregatesFilter<"Invitation"> | Date | string
  }

  export type CourseCreateInput = {
    id?: string
    name: string
    desc?: string | null
    code: string
    background?: string | null
    createdAt?: Date | string
    invitations?: InvitationCreateNestedManyWithoutCourseInput
    attendees?: UserCourseCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    name: string
    desc?: string | null
    code: string
    background?: string | null
    createdAt?: Date | string
    invitations?: InvitationUncheckedCreateNestedManyWithoutCourseInput
    attendees?: UserCourseUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    background?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationUpdateManyWithoutCourseNestedInput
    attendees?: UserCourseUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    background?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationUncheckedUpdateManyWithoutCourseNestedInput
    attendees?: UserCourseUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    name: string
    desc?: string | null
    code: string
    background?: string | null
    createdAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    background?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    background?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCourseCreateInput = {
    userId: string
    role: $Enums.UserCourseRole
    joinedAt?: Date | string
    course: CourseCreateNestedOneWithoutAttendeesInput
    invitation?: InvitationCreateNestedOneWithoutAttendeeInput
  }

  export type UserCourseUncheckedCreateInput = {
    userId: string
    courseId: string
    role: $Enums.UserCourseRole
    invitationId?: string | null
    joinedAt?: Date | string
  }

  export type UserCourseUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutAttendeesNestedInput
    invitation?: InvitationUpdateOneWithoutAttendeeNestedInput
  }

  export type UserCourseUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitationId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCourseCreateManyInput = {
    userId: string
    courseId: string
    role: $Enums.UserCourseRole
    invitationId?: string | null
    joinedAt?: Date | string
  }

  export type UserCourseUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCourseUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitationId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationCreateInput = {
    id?: string
    email: string
    role: $Enums.UserCourseRole
    invitedBy: string
    state: $Enums.InvitationState
    createdAt?: Date | string
    course: CourseCreateNestedOneWithoutInvitationsInput
    attendee?: UserCourseCreateNestedOneWithoutInvitationInput
  }

  export type InvitationUncheckedCreateInput = {
    id?: string
    email: string
    role: $Enums.UserCourseRole
    invitedBy: string
    courseId: string
    state: $Enums.InvitationState
    createdAt?: Date | string
    attendee?: UserCourseUncheckedCreateNestedOneWithoutInvitationInput
  }

  export type InvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitedBy?: StringFieldUpdateOperationsInput | string
    state?: EnumInvitationStateFieldUpdateOperationsInput | $Enums.InvitationState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutInvitationsNestedInput
    attendee?: UserCourseUpdateOneWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitedBy?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    state?: EnumInvitationStateFieldUpdateOperationsInput | $Enums.InvitationState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendee?: UserCourseUncheckedUpdateOneWithoutInvitationNestedInput
  }

  export type InvitationCreateManyInput = {
    id?: string
    email: string
    role: $Enums.UserCourseRole
    invitedBy: string
    courseId: string
    state: $Enums.InvitationState
    createdAt?: Date | string
  }

  export type InvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitedBy?: StringFieldUpdateOperationsInput | string
    state?: EnumInvitationStateFieldUpdateOperationsInput | $Enums.InvitationState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitedBy?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    state?: EnumInvitationStateFieldUpdateOperationsInput | $Enums.InvitationState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InvitationListRelationFilter = {
    every?: InvitationWhereInput
    some?: InvitationWhereInput
    none?: InvitationWhereInput
  }

  export type UserCourseListRelationFilter = {
    every?: UserCourseWhereInput
    some?: UserCourseWhereInput
    none?: UserCourseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    code?: SortOrder
    background?: SortOrder
    createdAt?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    code?: SortOrder
    background?: SortOrder
    createdAt?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    code?: SortOrder
    background?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumUserCourseRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserCourseRole | EnumUserCourseRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserCourseRole[] | ListEnumUserCourseRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserCourseRole[] | ListEnumUserCourseRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserCourseRoleFilter<$PrismaModel> | $Enums.UserCourseRole
  }

  export type CourseRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type InvitationNullableRelationFilter = {
    is?: InvitationWhereInput | null
    isNot?: InvitationWhereInput | null
  }

  export type UserCourseUserIdCourseIdCompoundUniqueInput = {
    userId: string
    courseId: string
  }

  export type UserCourseCountOrderByAggregateInput = {
    userId?: SortOrder
    courseId?: SortOrder
    role?: SortOrder
    invitationId?: SortOrder
    joinedAt?: SortOrder
  }

  export type UserCourseMaxOrderByAggregateInput = {
    userId?: SortOrder
    courseId?: SortOrder
    role?: SortOrder
    invitationId?: SortOrder
    joinedAt?: SortOrder
  }

  export type UserCourseMinOrderByAggregateInput = {
    userId?: SortOrder
    courseId?: SortOrder
    role?: SortOrder
    invitationId?: SortOrder
    joinedAt?: SortOrder
  }

  export type EnumUserCourseRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserCourseRole | EnumUserCourseRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserCourseRole[] | ListEnumUserCourseRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserCourseRole[] | ListEnumUserCourseRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserCourseRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserCourseRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserCourseRoleFilter<$PrismaModel>
    _max?: NestedEnumUserCourseRoleFilter<$PrismaModel>
  }

  export type EnumInvitationStateFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationState | EnumInvitationStateFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationState[] | ListEnumInvitationStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationState[] | ListEnumInvitationStateFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStateFilter<$PrismaModel> | $Enums.InvitationState
  }

  export type UserCourseNullableRelationFilter = {
    is?: UserCourseWhereInput | null
    isNot?: UserCourseWhereInput | null
  }

  export type InvitationCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    invitedBy?: SortOrder
    courseId?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
  }

  export type InvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    invitedBy?: SortOrder
    courseId?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
  }

  export type InvitationMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    invitedBy?: SortOrder
    courseId?: SortOrder
    state?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumInvitationStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationState | EnumInvitationStateFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationState[] | ListEnumInvitationStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationState[] | ListEnumInvitationStateFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStateWithAggregatesFilter<$PrismaModel> | $Enums.InvitationState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStateFilter<$PrismaModel>
    _max?: NestedEnumInvitationStateFilter<$PrismaModel>
  }

  export type InvitationCreateNestedManyWithoutCourseInput = {
    create?: XOR<InvitationCreateWithoutCourseInput, InvitationUncheckedCreateWithoutCourseInput> | InvitationCreateWithoutCourseInput[] | InvitationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutCourseInput | InvitationCreateOrConnectWithoutCourseInput[]
    createMany?: InvitationCreateManyCourseInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type UserCourseCreateNestedManyWithoutCourseInput = {
    create?: XOR<UserCourseCreateWithoutCourseInput, UserCourseUncheckedCreateWithoutCourseInput> | UserCourseCreateWithoutCourseInput[] | UserCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UserCourseCreateOrConnectWithoutCourseInput | UserCourseCreateOrConnectWithoutCourseInput[]
    createMany?: UserCourseCreateManyCourseInputEnvelope
    connect?: UserCourseWhereUniqueInput | UserCourseWhereUniqueInput[]
  }

  export type InvitationUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<InvitationCreateWithoutCourseInput, InvitationUncheckedCreateWithoutCourseInput> | InvitationCreateWithoutCourseInput[] | InvitationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutCourseInput | InvitationCreateOrConnectWithoutCourseInput[]
    createMany?: InvitationCreateManyCourseInputEnvelope
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
  }

  export type UserCourseUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<UserCourseCreateWithoutCourseInput, UserCourseUncheckedCreateWithoutCourseInput> | UserCourseCreateWithoutCourseInput[] | UserCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UserCourseCreateOrConnectWithoutCourseInput | UserCourseCreateOrConnectWithoutCourseInput[]
    createMany?: UserCourseCreateManyCourseInputEnvelope
    connect?: UserCourseWhereUniqueInput | UserCourseWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InvitationUpdateManyWithoutCourseNestedInput = {
    create?: XOR<InvitationCreateWithoutCourseInput, InvitationUncheckedCreateWithoutCourseInput> | InvitationCreateWithoutCourseInput[] | InvitationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutCourseInput | InvitationCreateOrConnectWithoutCourseInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutCourseInput | InvitationUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: InvitationCreateManyCourseInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutCourseInput | InvitationUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutCourseInput | InvitationUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type UserCourseUpdateManyWithoutCourseNestedInput = {
    create?: XOR<UserCourseCreateWithoutCourseInput, UserCourseUncheckedCreateWithoutCourseInput> | UserCourseCreateWithoutCourseInput[] | UserCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UserCourseCreateOrConnectWithoutCourseInput | UserCourseCreateOrConnectWithoutCourseInput[]
    upsert?: UserCourseUpsertWithWhereUniqueWithoutCourseInput | UserCourseUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: UserCourseCreateManyCourseInputEnvelope
    set?: UserCourseWhereUniqueInput | UserCourseWhereUniqueInput[]
    disconnect?: UserCourseWhereUniqueInput | UserCourseWhereUniqueInput[]
    delete?: UserCourseWhereUniqueInput | UserCourseWhereUniqueInput[]
    connect?: UserCourseWhereUniqueInput | UserCourseWhereUniqueInput[]
    update?: UserCourseUpdateWithWhereUniqueWithoutCourseInput | UserCourseUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: UserCourseUpdateManyWithWhereWithoutCourseInput | UserCourseUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: UserCourseScalarWhereInput | UserCourseScalarWhereInput[]
  }

  export type InvitationUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<InvitationCreateWithoutCourseInput, InvitationUncheckedCreateWithoutCourseInput> | InvitationCreateWithoutCourseInput[] | InvitationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: InvitationCreateOrConnectWithoutCourseInput | InvitationCreateOrConnectWithoutCourseInput[]
    upsert?: InvitationUpsertWithWhereUniqueWithoutCourseInput | InvitationUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: InvitationCreateManyCourseInputEnvelope
    set?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    disconnect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    delete?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    connect?: InvitationWhereUniqueInput | InvitationWhereUniqueInput[]
    update?: InvitationUpdateWithWhereUniqueWithoutCourseInput | InvitationUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: InvitationUpdateManyWithWhereWithoutCourseInput | InvitationUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
  }

  export type UserCourseUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<UserCourseCreateWithoutCourseInput, UserCourseUncheckedCreateWithoutCourseInput> | UserCourseCreateWithoutCourseInput[] | UserCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: UserCourseCreateOrConnectWithoutCourseInput | UserCourseCreateOrConnectWithoutCourseInput[]
    upsert?: UserCourseUpsertWithWhereUniqueWithoutCourseInput | UserCourseUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: UserCourseCreateManyCourseInputEnvelope
    set?: UserCourseWhereUniqueInput | UserCourseWhereUniqueInput[]
    disconnect?: UserCourseWhereUniqueInput | UserCourseWhereUniqueInput[]
    delete?: UserCourseWhereUniqueInput | UserCourseWhereUniqueInput[]
    connect?: UserCourseWhereUniqueInput | UserCourseWhereUniqueInput[]
    update?: UserCourseUpdateWithWhereUniqueWithoutCourseInput | UserCourseUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: UserCourseUpdateManyWithWhereWithoutCourseInput | UserCourseUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: UserCourseScalarWhereInput | UserCourseScalarWhereInput[]
  }

  export type CourseCreateNestedOneWithoutAttendeesInput = {
    create?: XOR<CourseCreateWithoutAttendeesInput, CourseUncheckedCreateWithoutAttendeesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutAttendeesInput
    connect?: CourseWhereUniqueInput
  }

  export type InvitationCreateNestedOneWithoutAttendeeInput = {
    create?: XOR<InvitationCreateWithoutAttendeeInput, InvitationUncheckedCreateWithoutAttendeeInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutAttendeeInput
    connect?: InvitationWhereUniqueInput
  }

  export type EnumUserCourseRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserCourseRole
  }

  export type CourseUpdateOneRequiredWithoutAttendeesNestedInput = {
    create?: XOR<CourseCreateWithoutAttendeesInput, CourseUncheckedCreateWithoutAttendeesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutAttendeesInput
    upsert?: CourseUpsertWithoutAttendeesInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutAttendeesInput, CourseUpdateWithoutAttendeesInput>, CourseUncheckedUpdateWithoutAttendeesInput>
  }

  export type InvitationUpdateOneWithoutAttendeeNestedInput = {
    create?: XOR<InvitationCreateWithoutAttendeeInput, InvitationUncheckedCreateWithoutAttendeeInput>
    connectOrCreate?: InvitationCreateOrConnectWithoutAttendeeInput
    upsert?: InvitationUpsertWithoutAttendeeInput
    disconnect?: InvitationWhereInput | boolean
    delete?: InvitationWhereInput | boolean
    connect?: InvitationWhereUniqueInput
    update?: XOR<XOR<InvitationUpdateToOneWithWhereWithoutAttendeeInput, InvitationUpdateWithoutAttendeeInput>, InvitationUncheckedUpdateWithoutAttendeeInput>
  }

  export type CourseCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<CourseCreateWithoutInvitationsInput, CourseUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutInvitationsInput
    connect?: CourseWhereUniqueInput
  }

  export type UserCourseCreateNestedOneWithoutInvitationInput = {
    create?: XOR<UserCourseCreateWithoutInvitationInput, UserCourseUncheckedCreateWithoutInvitationInput>
    connectOrCreate?: UserCourseCreateOrConnectWithoutInvitationInput
    connect?: UserCourseWhereUniqueInput
  }

  export type UserCourseUncheckedCreateNestedOneWithoutInvitationInput = {
    create?: XOR<UserCourseCreateWithoutInvitationInput, UserCourseUncheckedCreateWithoutInvitationInput>
    connectOrCreate?: UserCourseCreateOrConnectWithoutInvitationInput
    connect?: UserCourseWhereUniqueInput
  }

  export type EnumInvitationStateFieldUpdateOperationsInput = {
    set?: $Enums.InvitationState
  }

  export type CourseUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<CourseCreateWithoutInvitationsInput, CourseUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutInvitationsInput
    upsert?: CourseUpsertWithoutInvitationsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutInvitationsInput, CourseUpdateWithoutInvitationsInput>, CourseUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserCourseUpdateOneWithoutInvitationNestedInput = {
    create?: XOR<UserCourseCreateWithoutInvitationInput, UserCourseUncheckedCreateWithoutInvitationInput>
    connectOrCreate?: UserCourseCreateOrConnectWithoutInvitationInput
    upsert?: UserCourseUpsertWithoutInvitationInput
    disconnect?: UserCourseWhereInput | boolean
    delete?: UserCourseWhereInput | boolean
    connect?: UserCourseWhereUniqueInput
    update?: XOR<XOR<UserCourseUpdateToOneWithWhereWithoutInvitationInput, UserCourseUpdateWithoutInvitationInput>, UserCourseUncheckedUpdateWithoutInvitationInput>
  }

  export type UserCourseUncheckedUpdateOneWithoutInvitationNestedInput = {
    create?: XOR<UserCourseCreateWithoutInvitationInput, UserCourseUncheckedCreateWithoutInvitationInput>
    connectOrCreate?: UserCourseCreateOrConnectWithoutInvitationInput
    upsert?: UserCourseUpsertWithoutInvitationInput
    disconnect?: UserCourseWhereInput | boolean
    delete?: UserCourseWhereInput | boolean
    connect?: UserCourseWhereUniqueInput
    update?: XOR<XOR<UserCourseUpdateToOneWithWhereWithoutInvitationInput, UserCourseUpdateWithoutInvitationInput>, UserCourseUncheckedUpdateWithoutInvitationInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumUserCourseRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserCourseRole | EnumUserCourseRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserCourseRole[] | ListEnumUserCourseRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserCourseRole[] | ListEnumUserCourseRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserCourseRoleFilter<$PrismaModel> | $Enums.UserCourseRole
  }

  export type NestedEnumUserCourseRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserCourseRole | EnumUserCourseRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserCourseRole[] | ListEnumUserCourseRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserCourseRole[] | ListEnumUserCourseRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserCourseRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserCourseRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserCourseRoleFilter<$PrismaModel>
    _max?: NestedEnumUserCourseRoleFilter<$PrismaModel>
  }

  export type NestedEnumInvitationStateFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationState | EnumInvitationStateFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationState[] | ListEnumInvitationStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationState[] | ListEnumInvitationStateFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStateFilter<$PrismaModel> | $Enums.InvitationState
  }

  export type NestedEnumInvitationStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvitationState | EnumInvitationStateFieldRefInput<$PrismaModel>
    in?: $Enums.InvitationState[] | ListEnumInvitationStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvitationState[] | ListEnumInvitationStateFieldRefInput<$PrismaModel>
    not?: NestedEnumInvitationStateWithAggregatesFilter<$PrismaModel> | $Enums.InvitationState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvitationStateFilter<$PrismaModel>
    _max?: NestedEnumInvitationStateFilter<$PrismaModel>
  }

  export type InvitationCreateWithoutCourseInput = {
    id?: string
    email: string
    role: $Enums.UserCourseRole
    invitedBy: string
    state: $Enums.InvitationState
    createdAt?: Date | string
    attendee?: UserCourseCreateNestedOneWithoutInvitationInput
  }

  export type InvitationUncheckedCreateWithoutCourseInput = {
    id?: string
    email: string
    role: $Enums.UserCourseRole
    invitedBy: string
    state: $Enums.InvitationState
    createdAt?: Date | string
    attendee?: UserCourseUncheckedCreateNestedOneWithoutInvitationInput
  }

  export type InvitationCreateOrConnectWithoutCourseInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutCourseInput, InvitationUncheckedCreateWithoutCourseInput>
  }

  export type InvitationCreateManyCourseInputEnvelope = {
    data: InvitationCreateManyCourseInput | InvitationCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type UserCourseCreateWithoutCourseInput = {
    userId: string
    role: $Enums.UserCourseRole
    joinedAt?: Date | string
    invitation?: InvitationCreateNestedOneWithoutAttendeeInput
  }

  export type UserCourseUncheckedCreateWithoutCourseInput = {
    userId: string
    role: $Enums.UserCourseRole
    invitationId?: string | null
    joinedAt?: Date | string
  }

  export type UserCourseCreateOrConnectWithoutCourseInput = {
    where: UserCourseWhereUniqueInput
    create: XOR<UserCourseCreateWithoutCourseInput, UserCourseUncheckedCreateWithoutCourseInput>
  }

  export type UserCourseCreateManyCourseInputEnvelope = {
    data: UserCourseCreateManyCourseInput | UserCourseCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type InvitationUpsertWithWhereUniqueWithoutCourseInput = {
    where: InvitationWhereUniqueInput
    update: XOR<InvitationUpdateWithoutCourseInput, InvitationUncheckedUpdateWithoutCourseInput>
    create: XOR<InvitationCreateWithoutCourseInput, InvitationUncheckedCreateWithoutCourseInput>
  }

  export type InvitationUpdateWithWhereUniqueWithoutCourseInput = {
    where: InvitationWhereUniqueInput
    data: XOR<InvitationUpdateWithoutCourseInput, InvitationUncheckedUpdateWithoutCourseInput>
  }

  export type InvitationUpdateManyWithWhereWithoutCourseInput = {
    where: InvitationScalarWhereInput
    data: XOR<InvitationUpdateManyMutationInput, InvitationUncheckedUpdateManyWithoutCourseInput>
  }

  export type InvitationScalarWhereInput = {
    AND?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    OR?: InvitationScalarWhereInput[]
    NOT?: InvitationScalarWhereInput | InvitationScalarWhereInput[]
    id?: StringFilter<"Invitation"> | string
    email?: StringFilter<"Invitation"> | string
    role?: EnumUserCourseRoleFilter<"Invitation"> | $Enums.UserCourseRole
    invitedBy?: StringFilter<"Invitation"> | string
    courseId?: StringFilter<"Invitation"> | string
    state?: EnumInvitationStateFilter<"Invitation"> | $Enums.InvitationState
    createdAt?: DateTimeFilter<"Invitation"> | Date | string
  }

  export type UserCourseUpsertWithWhereUniqueWithoutCourseInput = {
    where: UserCourseWhereUniqueInput
    update: XOR<UserCourseUpdateWithoutCourseInput, UserCourseUncheckedUpdateWithoutCourseInput>
    create: XOR<UserCourseCreateWithoutCourseInput, UserCourseUncheckedCreateWithoutCourseInput>
  }

  export type UserCourseUpdateWithWhereUniqueWithoutCourseInput = {
    where: UserCourseWhereUniqueInput
    data: XOR<UserCourseUpdateWithoutCourseInput, UserCourseUncheckedUpdateWithoutCourseInput>
  }

  export type UserCourseUpdateManyWithWhereWithoutCourseInput = {
    where: UserCourseScalarWhereInput
    data: XOR<UserCourseUpdateManyMutationInput, UserCourseUncheckedUpdateManyWithoutCourseInput>
  }

  export type UserCourseScalarWhereInput = {
    AND?: UserCourseScalarWhereInput | UserCourseScalarWhereInput[]
    OR?: UserCourseScalarWhereInput[]
    NOT?: UserCourseScalarWhereInput | UserCourseScalarWhereInput[]
    userId?: StringFilter<"UserCourse"> | string
    courseId?: StringFilter<"UserCourse"> | string
    role?: EnumUserCourseRoleFilter<"UserCourse"> | $Enums.UserCourseRole
    invitationId?: StringNullableFilter<"UserCourse"> | string | null
    joinedAt?: DateTimeFilter<"UserCourse"> | Date | string
  }

  export type CourseCreateWithoutAttendeesInput = {
    id?: string
    name: string
    desc?: string | null
    code: string
    background?: string | null
    createdAt?: Date | string
    invitations?: InvitationCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutAttendeesInput = {
    id?: string
    name: string
    desc?: string | null
    code: string
    background?: string | null
    createdAt?: Date | string
    invitations?: InvitationUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutAttendeesInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutAttendeesInput, CourseUncheckedCreateWithoutAttendeesInput>
  }

  export type InvitationCreateWithoutAttendeeInput = {
    id?: string
    email: string
    role: $Enums.UserCourseRole
    invitedBy: string
    state: $Enums.InvitationState
    createdAt?: Date | string
    course: CourseCreateNestedOneWithoutInvitationsInput
  }

  export type InvitationUncheckedCreateWithoutAttendeeInput = {
    id?: string
    email: string
    role: $Enums.UserCourseRole
    invitedBy: string
    courseId: string
    state: $Enums.InvitationState
    createdAt?: Date | string
  }

  export type InvitationCreateOrConnectWithoutAttendeeInput = {
    where: InvitationWhereUniqueInput
    create: XOR<InvitationCreateWithoutAttendeeInput, InvitationUncheckedCreateWithoutAttendeeInput>
  }

  export type CourseUpsertWithoutAttendeesInput = {
    update: XOR<CourseUpdateWithoutAttendeesInput, CourseUncheckedUpdateWithoutAttendeesInput>
    create: XOR<CourseCreateWithoutAttendeesInput, CourseUncheckedCreateWithoutAttendeesInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutAttendeesInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutAttendeesInput, CourseUncheckedUpdateWithoutAttendeesInput>
  }

  export type CourseUpdateWithoutAttendeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    background?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutAttendeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    background?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitations?: InvitationUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type InvitationUpsertWithoutAttendeeInput = {
    update: XOR<InvitationUpdateWithoutAttendeeInput, InvitationUncheckedUpdateWithoutAttendeeInput>
    create: XOR<InvitationCreateWithoutAttendeeInput, InvitationUncheckedCreateWithoutAttendeeInput>
    where?: InvitationWhereInput
  }

  export type InvitationUpdateToOneWithWhereWithoutAttendeeInput = {
    where?: InvitationWhereInput
    data: XOR<InvitationUpdateWithoutAttendeeInput, InvitationUncheckedUpdateWithoutAttendeeInput>
  }

  export type InvitationUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitedBy?: StringFieldUpdateOperationsInput | string
    state?: EnumInvitationStateFieldUpdateOperationsInput | $Enums.InvitationState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutInvitationsNestedInput
  }

  export type InvitationUncheckedUpdateWithoutAttendeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitedBy?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    state?: EnumInvitationStateFieldUpdateOperationsInput | $Enums.InvitationState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateWithoutInvitationsInput = {
    id?: string
    name: string
    desc?: string | null
    code: string
    background?: string | null
    createdAt?: Date | string
    attendees?: UserCourseCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutInvitationsInput = {
    id?: string
    name: string
    desc?: string | null
    code: string
    background?: string | null
    createdAt?: Date | string
    attendees?: UserCourseUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutInvitationsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutInvitationsInput, CourseUncheckedCreateWithoutInvitationsInput>
  }

  export type UserCourseCreateWithoutInvitationInput = {
    userId: string
    role: $Enums.UserCourseRole
    joinedAt?: Date | string
    course: CourseCreateNestedOneWithoutAttendeesInput
  }

  export type UserCourseUncheckedCreateWithoutInvitationInput = {
    userId: string
    courseId: string
    role: $Enums.UserCourseRole
    joinedAt?: Date | string
  }

  export type UserCourseCreateOrConnectWithoutInvitationInput = {
    where: UserCourseWhereUniqueInput
    create: XOR<UserCourseCreateWithoutInvitationInput, UserCourseUncheckedCreateWithoutInvitationInput>
  }

  export type CourseUpsertWithoutInvitationsInput = {
    update: XOR<CourseUpdateWithoutInvitationsInput, CourseUncheckedUpdateWithoutInvitationsInput>
    create: XOR<CourseCreateWithoutInvitationsInput, CourseUncheckedCreateWithoutInvitationsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutInvitationsInput, CourseUncheckedUpdateWithoutInvitationsInput>
  }

  export type CourseUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    background?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendees?: UserCourseUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutInvitationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    code?: StringFieldUpdateOperationsInput | string
    background?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendees?: UserCourseUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type UserCourseUpsertWithoutInvitationInput = {
    update: XOR<UserCourseUpdateWithoutInvitationInput, UserCourseUncheckedUpdateWithoutInvitationInput>
    create: XOR<UserCourseCreateWithoutInvitationInput, UserCourseUncheckedCreateWithoutInvitationInput>
    where?: UserCourseWhereInput
  }

  export type UserCourseUpdateToOneWithWhereWithoutInvitationInput = {
    where?: UserCourseWhereInput
    data: XOR<UserCourseUpdateWithoutInvitationInput, UserCourseUncheckedUpdateWithoutInvitationInput>
  }

  export type UserCourseUpdateWithoutInvitationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutAttendeesNestedInput
  }

  export type UserCourseUncheckedUpdateWithoutInvitationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvitationCreateManyCourseInput = {
    id?: string
    email: string
    role: $Enums.UserCourseRole
    invitedBy: string
    state: $Enums.InvitationState
    createdAt?: Date | string
  }

  export type UserCourseCreateManyCourseInput = {
    userId: string
    role: $Enums.UserCourseRole
    invitationId?: string | null
    joinedAt?: Date | string
  }

  export type InvitationUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitedBy?: StringFieldUpdateOperationsInput | string
    state?: EnumInvitationStateFieldUpdateOperationsInput | $Enums.InvitationState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendee?: UserCourseUpdateOneWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitedBy?: StringFieldUpdateOperationsInput | string
    state?: EnumInvitationStateFieldUpdateOperationsInput | $Enums.InvitationState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendee?: UserCourseUncheckedUpdateOneWithoutInvitationNestedInput
  }

  export type InvitationUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitedBy?: StringFieldUpdateOperationsInput | string
    state?: EnumInvitationStateFieldUpdateOperationsInput | $Enums.InvitationState
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCourseUpdateWithoutCourseInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invitation?: InvitationUpdateOneWithoutAttendeeNestedInput
  }

  export type UserCourseUncheckedUpdateWithoutCourseInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitationId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCourseUncheckedUpdateManyWithoutCourseInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserCourseRoleFieldUpdateOperationsInput | $Enums.UserCourseRole
    invitationId?: NullableStringFieldUpdateOperationsInput | string | null
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CourseCountOutputTypeDefaultArgs instead
     */
    export type CourseCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CourseCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CourseDefaultArgs instead
     */
    export type CourseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CourseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCourseDefaultArgs instead
     */
    export type UserCourseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCourseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvitationDefaultArgs instead
     */
    export type InvitationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvitationDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}