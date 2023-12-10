export interface CourseResponse {
  id: string;
  name: string;
  desc: string;
  code: string;
  background?: string;
  createdAt: Date;
  host?: CourseHostResponse;
  profile?: CourseHostResponse;
}

export interface CourseHostResponse {
  userId: string;
  courseId: string;
  email?: string;
  role: string;
  invitationId?: string;
  joinedAt: Date;
  name?: string;
  nickname?: string;
  picture?: string;
}
