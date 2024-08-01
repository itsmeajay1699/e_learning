import { z } from "zod";

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
  profilePicture: string;
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
  _id: string;
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

export type RegisterUser = {
  email: string;
  password: string;
  profilePic?: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type Message = {
  id: string;
  chatRoomId: string;
  senderId: string;
  message: string;
  senderType: "student" | "educator";
};

export type ChatRoom = {
  id: string;
  courseId: string;
  participant1: string;
  participant2: string;
  lastMessage: string;
  courseDetails: {
    title: string;
    thumbnail: string;
  };
  participant1_student: {
    id: string;
    email: string;
    profilePicture: string;
  };
  participant2_educator: {
    id: string;
    email: string;
    profilePicture: string;
  };
};

export type User = {
  _id: string;
  email: string;
  role: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  _id: string;
  categoryName: string;
};

export const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  price: z.string().min(1),
  duration: z.string().min(1),
  sessionDetails: z.array(
    z.object({
      sessionNumber: z.number().positive(),
      title: z.string().min(5),
      description: z.string().min(10),
    })
  ),
  status: z.string().min(1),
  totalEnrollment: z.number().optional(),
  totalSession: z.number().positive().optional(),
  rating: z.string().optional(),
  thumbnail: z.string().optional(),
  categoryId: z.string().min(1, {
    message: "Please select a category",
  }),
  thumbnailLink: z.string().optional(),
});
