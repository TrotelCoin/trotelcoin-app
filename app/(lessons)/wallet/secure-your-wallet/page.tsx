"use client";

import Image from "next/image";
import "animate.css";
import { Course } from "@/types/types";

const currentCourse: Course = {
  title: "Secure your wallet",
};

const CoursePage = () => {
  return (
    <>
      <div className="max-w-2xl">
        <p className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-200">
          Course
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {currentCourse.title}
        </h1>
        <p className="mt-2 text-gray-900 dark:text-gray-100">
          What are you going to learn?
        </p>
        <div className="bg-gray-50 my-10 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 rounded-lg px-10 py-2 dark:bg-gray-900">
          <ul
            role="list"
            className="max-w-xl space-y-8 text-gray-700 dark:text-gray-300"
          >
            <div className="grid grid-cols-1 divide-y divide-gray-900/10 dark:divide-gray-100/10">
              <div className="py-4">
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-gray-100">
                      Choose your wallet.
                    </strong>{" "}
                    Choose a crypto wallet that suits your needs.
                  </span>
                </li>
              </div>
              <div className="py-4">
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-gray-100">
                      Purposes of wallets.
                    </strong>{" "}
                    Be aware that crypto wallets serve specific purposes.
                  </span>
                </li>
              </div>
              <div className="py-4">
                <li className="flex gap-x-3">
                  <span>
                    <strong className="font-semibold text-gray-900 dark:text-gray-100">
                      Good practices.
                    </strong>{" "}
                    Understand how to secure your wallet to navigate in the defi
                    world securely.
                  </span>
                </li>
              </div>
            </div>
          </ul>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Install your first wallet
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
              aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim
              tristique.”
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
          Configure your wallet
        </h2>
        <p className="mt-6">
          Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam
          varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales
          cursus tristique. Tincidunt sed tempus ut viverra ridiculus non
          molestie. Gravida quis fringilla amet eget dui tempor dignissim.
          Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum
          convallis quam.
        </p>
        <p className="mt-8">
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit.
        </p>
      </div>
    </>
  );
};

export default CoursePage;
