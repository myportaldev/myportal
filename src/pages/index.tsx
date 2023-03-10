import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My Portal</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">Hello world!</p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && (
          <span>
            Logged in as {sessionData.user?.name}.{" "}
            {sessionData.user?.phoneNumber}. {sessionData.user?.company}.{" "}
            {sessionData.user?.professionalRole}
          </span>
        )}
      </p>
      <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
        {sessionData ? (
          //void: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
          <span onClick={() => void signOut()}>Sign out</span>
        ) : (
          <Link href="/sign-in">Sign in</Link>
        )}
      </button>
    </div>
  );
};
