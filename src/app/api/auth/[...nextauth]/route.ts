// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         // måst ennu änder to skitn åv chatskibidi
//         if (
//           credentials?.email === "test@example.com" &&
//           credentials?.password === "password"
//         ) {
//           return { id: "1", name: "Test User", email: "test@example.com" };
//         }
//         return null;
//       }
//     })
//   ],
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: "/login",
//     error: "/login"
//   }
// });

// export { handler as GET, handler as POST }