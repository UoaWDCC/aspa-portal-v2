import { Listbox, Switch, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiCheck, HiOutlineSelector } from "react-icons/hi";
import { IoCheckmarkSharp } from "react-icons/io5";

export default function SpecificData() {
  return (
    <aside className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          <label htmlFor="skillLevel">Skill level</label>
          <SkillDropDown />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="previousMember">Previous ASPA Member</label>
        <PreviousMemberCheckbox />
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
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected} name="skillLevel">
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer bg-transparent pl-3 pr-10 py-2 border-2 rounded-lg text-left">
            <span className="block truncate">{skillLevels[selected]}</span>
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
            <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded-md bg-gray-800 text-sm border-2 border-gray-500 z-10">
              {skillLevels.map((skillLevel, i) => (
                <Listbox.Option
                  key={i}
                  className="relative cursor-pointer select-none py-3 pl-3 pr-10 transition-colors text-white hover:bg-gray-700"
                  value={i}
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

function PreviousMemberCheckbox() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <input
        type="text"
        className="hidden"
        name="previousMember"
        id="previousMember"
        value={enabled ? "on" : "off"}
      />
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="relative inline-flex justify-center items-center h-8 w-8 shrink-0 cursor-pointer rounded-lg border-2 border-white transition-colors duration-100 ease-in-out"
      >
        <IoCheckmarkSharp
          aria-hidden="true"
          size={48}
          className={`${enabled ? "opacity-100" : "opacity-0"}
            pointer-events-none`}
        />
      </Switch>
    </>
  );
}
