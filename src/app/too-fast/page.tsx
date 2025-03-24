import Link from "next/link";

const Page = () => {
  return (
    <main className="bg-pattern root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-light-100 text-5xl">Whoa, Slow Down There, Speedy!</h1>
      <p className="text-light-400 mt-3 max-w-xl text-center">
        Looks like you&apos;ve been a little too eager. We&apos;ve put a temporar pause on your excitement. 🚦 Chill for
        a bit, and try again shortly
      </p>
      <Link className="form-btn mt-7 max-w-36" href="/">
        Go home
      </Link>
    </main>
  );
};

export default Page;
