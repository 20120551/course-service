
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
} = require('./runtime/edge')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.6.0
 * Query Engine version: e95e739751f42d8ca026f6b910f5a2dc5adeaeee
 */
Prisma.prismaVersion = {
  client: "5.6.0",
  engine: "e95e739751f42d8ca026f6b910f5a2dc5adeaeee"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  picture: 'picture'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  name: 'name',
  desc: 'desc',
  code: 'code',
  background: 'background',
  createdAt: 'createdAt'
};

exports.Prisma.UserCourseScalarFieldEnum = {
  userId: 'userId',
  courseId: 'courseId',
  role: 'role',
  invitationId: 'invitationId',
  joinedAt: 'joinedAt'
};

exports.Prisma.InvitationScalarFieldEnum = {
  id: 'id',
  email: 'email',
  role: 'role',
  invitedBy: 'invitedBy',
  courseId: 'courseId',
  state: 'state',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserCourseRole = exports.$Enums.UserCourseRole = {
  HOST: 'HOST',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT'
};

exports.InvitationState = exports.$Enums.InvitationState = {
  PROCESSING: 'PROCESSING',
  SENT: 'SENT',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Course: 'Course',
  UserCourse: 'UserCourse',
  Invitation: 'Invitation'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\SOURCE CODE\\Project\\graduation\\Backend\\webnc\\course-service\\src\\utils\\prisma\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-1.0.x"
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../../.env",
    "schemaEnvPath": "../../../../.env"
  },
  "relativePath": "../../../../prisma",
  "clientVersion": "5.6.0",
  "engineVersion": "e95e739751f42d8ca026f6b910f5a2dc5adeaeee",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgICAgICA9ICJwcmlzbWEtY2xpZW50LWpzIgogIG91dHB1dCAgICAgICAgPSAiLi4vc3JjL3V0aWxzL3ByaXNtYS9jbGllbnQiCiAgYmluYXJ5VGFyZ2V0cyA9IFsibmF0aXZlIiwgImRlYmlhbi1vcGVuc3NsLTEuMC54Il0KfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAicG9zdGdyZXNxbCIKICB1cmwgICAgICA9IGVudigiREFUQUJBU0VfVVJMIikKfQoKbW9kZWwgVXNlciB7CiAgaWQgICAgICAgICBTdHJpbmcgICAgICAgQGlkIEBkZWZhdWx0KHV1aWQoKSkKICBuYW1lICAgICAgIFN0cmluZwogIGVtYWlsICAgICAgU3RyaW5nICAgICAgIEB1bmlxdWUKICBwaWN0dXJlICAgIFN0cmluZwogIFVzZXJDb3Vyc2UgVXNlckNvdXJzZVtdCn0KCm1vZGVsIENvdXJzZSB7CiAgaWQgICAgICAgICAgU3RyaW5nICAgICAgIEBpZCBAZGVmYXVsdCh1dWlkKCkpCiAgbmFtZSAgICAgICAgU3RyaW5nCiAgZGVzYyAgICAgICAgU3RyaW5nPwogIGNvZGUgICAgICAgIFN0cmluZwogIGJhY2tncm91bmQgIFN0cmluZz8KICBpbnZpdGF0aW9ucyBJbnZpdGF0aW9uW10KICBhdHRlbmRlZXMgICBVc2VyQ291cnNlW10KICBjcmVhdGVkQXQgICBEYXRlVGltZSAgICAgQGRlZmF1bHQobm93KCkpIEBtYXAoImNyZWF0ZWRfYXQiKQoKICBAQG1hcCgiY291cnNlIikKfQoKbW9kZWwgVXNlckNvdXJzZSB7CiAgdXNlcklkICAgICAgIFN0cmluZyAgICAgICAgIEBtYXAoInVzZXJfaWQiKQogIHVzZXIgICAgICAgICBVc2VyICAgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCiAgY291cnNlSWQgICAgIFN0cmluZyAgICAgICAgIEBtYXAoImNvdXJzZV9pZCIpCiAgY291cnNlICAgICAgIENvdXJzZSAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjb3Vyc2VJZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlKQogIHJvbGUgICAgICAgICBVc2VyQ291cnNlUm9sZQogIGludml0YXRpb25JZCBTdHJpbmc/ICAgICAgICBAdW5pcXVlIEBtYXAoImludml0YXRpb25faWQiKQogIGludml0YXRpb24gICBJbnZpdGF0aW9uPyAgICBAcmVsYXRpb24oZmllbGRzOiBbaW52aXRhdGlvbklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCiAgam9pbmVkQXQgICAgIERhdGVUaW1lICAgICAgIEBkZWZhdWx0KG5vdygpKSBAbWFwKCJqb2luZWRfYXQiKQoKICBAQGlkKFt1c2VySWQsIGNvdXJzZUlkXSkKICBAQG1hcCgidXNlcl9jb3Vyc2UiKQp9Cgptb2RlbCBJbnZpdGF0aW9uIHsKICBpZCAgICAgICAgIFN0cmluZyAgICAgICAgICBAaWQgQGRlZmF1bHQodXVpZCgpKQogIGVtYWlsICAgICAgU3RyaW5nCiAgcm9sZSAgICAgICBVc2VyQ291cnNlUm9sZQogIGludml0ZWRCeSAgU3RyaW5nICAgICAgICAgIEBtYXAoImludml0ZWRfYnkiKQogIGNvdXJzZSAgICAgQ291cnNlICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjb3Vyc2VJZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlKQogIGNvdXJzZUlkICAgU3RyaW5nICAgICAgICAgIEBtYXAoImNvdXJzZV9pZCIpCiAgc3RhdGUgICAgICBJbnZpdGF0aW9uU3RhdGUKICBjcmVhdGVkQXQgIERhdGVUaW1lICAgICAgICBAZGVmYXVsdChub3coKSkgQG1hcCgiY3JlYXRlZF9hdCIpCiAgVXNlckNvdXJzZSBVc2VyQ291cnNlPwoKICBAQG1hcCgiaW52aXRhdGlvbiIpCn0KCmVudW0gVXNlckNvdXJzZVJvbGUgewogIEhPU1QKICBURUFDSEVSCiAgU1RVREVOVAoKICBAQG1hcCgidXNlcl9jb3Vyc2Vfcm9sZSIpCn0KCmVudW0gSW52aXRhdGlvblN0YXRlIHsKICBQUk9DRVNTSU5HCiAgU0VOVAogIEFDQ0VQVEVECiAgUkVKRUNURUQKCiAgQEBtYXAoImludml0YXRpb25fc3RhdGUiKQp9Cg==",
  "inlineSchemaHash": "3af0f0f43d292055f90f7b1506cecb9e8cca88a9431ffc471ee1cd5d5ac80db6"
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"picture\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UserCourse\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserCourse\",\"relationName\":\"UserToUserCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Course\":{\"dbName\":\"course\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"desc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"background\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Invitation\",\"relationName\":\"CourseToInvitation\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attendees\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserCourse\",\"relationName\":\"CourseToUserCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserCourse\":{\"dbName\":\"user_course\",\"fields\":[{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserCourse\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Course\",\"relationName\":\"CourseToUserCourse\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserCourseRole\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitationId\",\"dbName\":\"invitation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Invitation\",\"relationName\":\"InvitationToUserCourse\",\"relationFromFields\":[\"invitationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"joinedAt\",\"dbName\":\"joined_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userId\",\"courseId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Invitation\":{\"dbName\":\"invitation\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserCourseRole\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invitedBy\",\"dbName\":\"invited_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Course\",\"relationName\":\"CourseToInvitation\",\"relationFromFields\":[\"courseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courseId\",\"dbName\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"InvitationState\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"UserCourse\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserCourse\",\"relationName\":\"InvitationToUserCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"UserCourseRole\":{\"values\":[{\"name\":\"HOST\",\"dbName\":null},{\"name\":\"TEACHER\",\"dbName\":null},{\"name\":\"STUDENT\",\"dbName\":null}],\"dbName\":\"user_course_role\"},\"InvitationState\":{\"values\":[{\"name\":\"PROCESSING\",\"dbName\":null},{\"name\":\"SENT\",\"dbName\":null},{\"name\":\"ACCEPTED\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null}],\"dbName\":\"invitation_state\"}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

