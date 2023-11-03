"use client";

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

interface Course {
  id: number;
  title: string;
  module: string;
  // Add other properties for the course
}

const currentCourse: Course = {
  id: 11,
  title: "Introduction to Wallets",
  module: "Create your wallet",
};

const CoursePage = () => {
  return (
    <div className="bg-white dark:bg-black px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
        <p className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-200">
          {currentCourse.module}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {currentCourse.title}
        </h1>
        <div className="mt-10 max-w-2xl">
          <p>What are you going to learn?</p>
          <ul
            role="list"
            className="mt-8 max-w-xl space-y-8 text-gray-600 dark:text-gray-400"
          >
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-blue-600 dark:text-blue-200"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900 dark:text-gray-100">
                  Choose your wallet.
                </strong>{" "}
                Choose a crypto wallet that suits your needs.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-blue-600 dark:text-blue-200"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900 dark:text-gray-100">
                  Purposes of wallets.
                </strong>{" "}
                Wallets are the most important part of the crypto ecosystem
                allowing you to send, swap and receive crypto but even
                authenticate on your favorite websites.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-blue-600 dark:text-blue-200"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900 dark:text-gray-100">
                  Good practices.
                </strong>{" "}
                Understand how to secure your wallet to navigate in the defi
                world securely.
              </span>
            </li>
          </ul>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Choose your wallet
          </h2>
          <p className="mt-6">
            Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat
            in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
            mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
            tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
            Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis
            diam.
          </p>
          <figure className="mt-10 border-l border-blue-600 dark:border-blue-200 pl-9">
            <blockquote className="font-semibold text-gray-900 dark:text-gray-100">
              <p>
                “Vel ultricies morbi odio facilisi ultrices accumsan donec lacus
                purus. Lectus nibh ullamcorper ac dictum justo in euismod. Risus
                aenean ut elit massa. In amet aliquet eget cras. Sem volutpat
                enim tristique.”
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <div className="text-sm leading-6">
                <strong className="font-semibold text-gray-900 dark:text-gray-100">
                  Alexandre Trotel
                </strong>{" "}
                – CEO & Founder
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit.
          </p>
        </div>
        <div className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Purposes of wallets
          </h2>
          <p className="mt-6">
            Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam
            varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales
            cursus tristique. Tincidunt sed tempus ut viverra ridiculus non
            molestie. Gravida quis fringilla amet eget dui tempor dignissim.
            Facilisis auctor venenatis varius nunc, congue erat ac. Cras
            fermentum convallis quam.
          </p>
          <p className="mt-8">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
