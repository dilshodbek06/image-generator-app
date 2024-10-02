import Form from "@/components/form";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-slate-600 to-slate-800 py-3">
      <h1 className="text-2xl  md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-50 via-neutral-300 to-orange-500">
        Image <span className="text-red-600">generator</span>
      </h1>
      <div className="mt-4 md:mt-8">
        <Form />
      </div>
    </div>
  );
}
