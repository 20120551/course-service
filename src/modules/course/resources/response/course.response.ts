import { JsonValue } from '@prisma/client/runtime/library';
import { Stream } from 'stream';

export interface StudentCourseTemplateResponse {
  fileName: string;
  ext: string;
  buffer: Buffer | Stream;
}

export interface StudentCourseResponse {
  studentId: string;
  fullname: string;
}

export interface studentUserMappingResponse {
  studentId: string;
  email: string;
  userId: string;
}

export interface CourseResponse {
  id: string;
  name: string;
  desc: string;
  code: string;
  background?: string;
  createdAt: Date;
  students?: StudentCourseResponse | JsonValue;
  attendees?: CourseHostResponse[];
  invitations?: CourseInvitationResponse[];
  host?: CourseHostResponse;
  profile?: CourseHostResponse;
}

export interface CourseInvitationResponse {
  id: string;
  email: string;
  role: string;
  invitedBy: string;
  courseId: string;
  state: string;
  createdAt: Date;
}

export interface CourseHostResponse {
  userId?: string;
  courseId?: string;
  email?: string;
  role?: string;
  invitationId?: string;
  joinedAt?: Date;
  name?: string;
  nickname?: string;
  picture?: string;
}
