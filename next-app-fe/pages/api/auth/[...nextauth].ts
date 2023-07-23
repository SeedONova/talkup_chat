import NextAuth from "next-auth";
import { User as NextAuthUser, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/MongoConnect";
import { comparePassword } from "@/lib/hashHelper";

interface CustomUser extends NextAuthUser {
  email: string;
  username: string;
  points: number;
  rating: number;
  tier: number;
  avatar: number;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: any
      ) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        await connectMongoDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await comparePassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          points: user.points,
          rating: user.rating,
           tier: user.tier,
          avatar: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({token, user, trigger, session}) {
      if(trigger == "update"){
        return {...token, ...session.user}
      }
      if (user) {
        token.id = user.id;
        token.username = (user as CustomUser).username;
        token.email = user.email;
        token.points = (user as CustomUser).points;
        token.rating = (user as CustomUser).rating;
        token.tier = (user as CustomUser).tier;
        token.avatar = (user as CustomUser).avatar;

      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...(token as JWT & CustomUser) };
      return session;
    },
  },
  secret: process.env.SECRET,
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    error: '/auth/error',
  },
});
