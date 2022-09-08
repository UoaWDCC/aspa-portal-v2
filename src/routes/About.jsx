import { motion } from "framer-motion";
import Logo from "../assets/logo.svg";
import { fadeUpInView } from "./animation/utils";

export default function About() {
  return (
    <motion.div {...fadeUpInView()} className="flex justify-center">
      <div className="pt-8 pb-28 max-w-4xl mx-4">
        <div className="flex items-center mb-12">
          <div className="prose text-white ">
            <h5 className="text-white leading-none mb-2">WHO ARE WE?</h5>
            <h1 className="text-white leading-none text-5xl mb-0">
              Auckland Student Pool Association
            </h1>
          </div>
          <img className="max-w-[40%]" src={Logo} alt="logo" />
        </div>
        <p className="max-w-[65ch] text-xl leading-relaxed">
          The Auckland Student Pool Association (ASPA), based in the University
          of Auckland, focuses on faciliating a supporting environment that
          brings people together who are passionate about pool and aims to
          promote billiard sports. We hold casual events, coaching events, and
          tournaments, connecting members that are interested in playing against
          other members in a competitive and social environmenreadt.
        </p>
      </div>
    </motion.div>
  );
}
