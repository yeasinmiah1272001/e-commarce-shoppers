import NextAuth from "next-auth/next";
import { authOptions } from "../../../../../auth";

const handeler = NextAuth(authOptions);

export { handeler as GET, handeler as POST };
