import { BsDiscord } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";

export default function Footer() {
  return (
    <footer className={"mx-14"}>
      <div>
        <Toaster
          position={"top-center"}
          containerClassName={"font-[Poppins]"}
          toastOptions={{
            success: {
              iconTheme: {
                primary: "black",
                secondary: "white",
              },
            },
          }}
        />
      </div>
      <div className="flex flex-row mt-auto border-t border-white/50 py-3.5 justify-center align-center space-x-10">
        <button
          className={"transition-transform hover:scale-110"}
          onClick={() => {
            navigator.clipboard.writeText("uoapool@gmail.com").then();
            toast.success(`uoapool@gmail.com copied to clipboard!`);
          }}
        >
          <MdMail size={35} />
        </button>
        <a
          className={"pt-0.5 transition-transform hover:scale-110"}
          href="https://www.facebook.com/aspa.uoa"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaFacebookSquare size={35} />
        </a>
        <a
          className={"pt-0.5 transition-transform hover:scale-110"}
          href="https://www.instagram.com/aspa.uoa/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaInstagramSquare size={35} />
        </a>
        <a
          className={"pt-1 transition-transform hover:scale-110"}
          href="https://discord.gg/Tz6hcJnmzd"
          rel="noopener noreferrer"
          target="_blank"
        >
          <BsDiscord size={35} />
        </a>
        <a
          className={"pt-0.5 transition-transform hover:scale-110"}
          href="https://www.linkedin.com/company/aspa-auckland-student-pool-association/about/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaLinkedin size={35} />
        </a>
      </div>
    </footer>
  );
}
