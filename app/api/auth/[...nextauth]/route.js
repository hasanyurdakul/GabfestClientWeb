import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        const url = `${process.env["API_URL"]}/Auth/Login`;
        const user = { id: 0, name: "hasan yurdakul" };
        try {
          const response = await axios.post(url, {
            username: credentials.username,
            password: credentials.password,
          });
          if (response.data.statusCode === 200) {
            user.apiToken = response.data.data;
            return user;
          } else {
            throw new Error("Invalid Credentials");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.apiToken = user.apiToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.apiToken = token.apiToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
