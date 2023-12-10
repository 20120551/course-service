export interface CourseResponse {
  id: string;
  name: string;
  desc: string;
  code: string;
  background?: string;
  createdAt: Date;
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
