import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("User not found.");
        }
        if (user.status === "PENDING_APPROVAL"){
            throw new Error("Account pending approval.");
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch){
            throw new Error("Password incorrect");
        }
        return{
            id: user.userID,
            username: user.username,
            email: user.email,
            role: user.role
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  }
});
export { handler as GET, handler as POST};