import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useFormikContext } from 'formik';

const DropDown = ({ options, name, initialValues }) => {
  const formik = useFormikContext();
  const [selected, setSelected] = useState(
    initialValues.map(initialValue =>
      options.find(option => option.key === initialValue)
    ) || []
  );

  return (
    <div className="mb-4 space-y-1">
      <div className="top-2 mr-80 w-72">
        <Listbox
          value={selected}
          onChange={value => {
            const selectedValues = value.map(item => item.key);
            formik.setFieldValue(name, selectedValues);
            setSelected(value);
          }}
          multiple
        >
          <div className="relative mt-1  shrink-0 ">
            <Listbox.Button className="relative w-[335px] cursor-default rounded-lg border bg-slate-50 py-2 pl-3 pr-10 text-left shadow-md hover:border-indigo-500  focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300  sm:text-sm">
              <span className="block truncate">
                {selected.length > 0 ? (
                  <span className="text-blue-500">
                    {selected.map(item => item.value).join(',')}
                  </span>
                ) : (
                  `Select ${name}`
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-[335px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.value}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
    </div>
  );
};
export default DropDown;
