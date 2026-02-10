import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../../../../lib/db";
import User from "../../../../models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      },
    },
  },
  callbacks: {
    async signIn({ user }) {
      await connectDB();
      const userExists = await User.findOne({ email: user.email });
      if (!userExists) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }
      return true;
    },

    async jwt({ token, user }) {
      await connectDB();
      const dbUser = await User.findOne({ email: token.email });
      if (dbUser) {
        token.id = dbUser._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
