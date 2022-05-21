import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiCheck, HiOutlineSelector } from "react-icons/hi";

export default function SpecificData() {
  return (
    <aside className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          <label htmlFor="skillLevel">Skill level</label>
          <SkillDropDown />
        </div>
      </div>
    </aside>
  );
}
const skillLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Pool is too easy",
];

function SkillDropDown() {
  const [selected, setSelected] = useState(skillLevels[0]);

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected} name="skillLevel">
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default bg-transparent pl-3 pr-10 py-2 border-2 rounded-lg text-left">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineSelector
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded-md bg-gray-800 text-sm border-2 border-gray-500">
              {skillLevels.map((skillLevel, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none py-3 pl-3 pr-10 transition-colors text-gray-300 ${
                      active ? "bg-gray-700 text-gray-300" : ""
                    }`
                  }
                  value={skillLevel}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {skillLevel}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-green-600">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
