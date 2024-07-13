type StudentDetails = {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  //   bio: string;
  createdAt: string;
  updatedAt: string;
};

type EducatorDetails = {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  //   bio: string;
  createdAt: string;
  updatedAt: string;
};

type SessionDetail = {
  sessionNumber: number;
  title: string;
  description: string;
};

type CourseSession = {
  _id: string;
  educatorId: string;
  educatorDetails: EducatorDetails;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  duration: number;
  totalEnrollment: number;
  totalSession: number;
  sessionDetails: SessionDetail[];
  status: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

type EnrolledCourse = {
  studentId: string;
  courseId: string;
  status: string;
  studentDetails: StudentDetails;
  educatorId: string;
  educatorDetails: EducatorDetails;
  courseDetails: CourseSession;
};

export type {
  StudentDetails,
  EducatorDetails,
  SessionDetail,
  CourseSession,
  EnrolledCourse,
};
