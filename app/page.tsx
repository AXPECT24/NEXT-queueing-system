import QueueForm from "@/components/form/QueueForm";
import Queue from "@/components/utilities/Queue";
import Search from "@/components/utilities/Search";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <div className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <QueueForm />

          <div className="text-14-regular mt-20">
            <p className="justify-items-center text-dark-600 xl:text-left">
              © 2024 Generic Queueing System 
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col container">
        <div className="py-4">
          <Search />
        </div>
        <div className="mt-12">
          <Queue />
        </div>
      </div>
    </div>
  );
}
