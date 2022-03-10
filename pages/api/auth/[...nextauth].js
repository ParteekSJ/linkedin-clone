import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/** https://generate-secret.vercel.app/32 */

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/home",
  },
  callbacks: {
    async session({ session, token }) {
      // Adding custom fields to our `session`
      session.user.uid = token.sub;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
