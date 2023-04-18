import React, { Fragment } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";
import { updatePhrase, setContactId } from "../addressBookSlice";

import { Combobox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { useGetContactsQuery } from "../../Api/api";

const ContactSearch = () => {

  const phrase = useSelector((state) => state.addressBook.phrase);
  const selectedContactId = useSelector(state => state.addressBook.selectedContactId);
  const { data: contacts, isLoading, isFetching } = useGetContactsQuery({name: phrase}); // creates a subscription to the endpoint/cache

  const dispatch = useDispatch();

  function handleOnChange({ id, name }) {
    dispatch(setContactId(id));
  }

  function handlePhraseUpdate(event) {
    dispatch(updatePhrase(event.target.value))
  }

  return (
    <div className="w-72">
      <Combobox value={ contacts && contacts.find(contact => contact.id === selectedContactId) } onChange={ handleOnChange }>
        <div className="relative mt-1">
          <div className="relative w-fill cursor-default overflow-hidden rounded-md bg-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">

            <Combobox.Input
              placeholder={ isLoading || isFetching ? 'Loading Contacts...' : 'Search Contacts...'}
              className="w-full border-none rounded-md py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(contact) => contact.name}
              onChange={ handlePhraseUpdate }
            />

            <Combobox.Button label="" className="absolute rounded-md inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={ Fragment }
            enter="transition-opacity ease-in duration-250"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-250"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // afterLeave={ () => dispatch(updatePhrase('')) }
          >
            {
              isLoading || isFetching ?
                // loading
                <div>Loading contact list...</div> :
                // done
                <Combobox.Options
                  className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {
                    !contacts && phrase !== ''
                      ?
                      <div className="relative cursor-pointer select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                      :
                      contacts.map((contact) =>
                        <Combobox.Option
                          key={ contact.id }
                          className={ ({ active }) =>
                            `relative hover:cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-blue-500 text-white' : 'text-gray-900'
                            }`
                          }
                          value={ contact }
                        >
                          { ({ selected, active }) => (
                            <>
                              <span
                                className={ `block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }` }
                              >
                                { contact.name }
                              </span>
                              { selected ? (
                                <span
                                  className={ `absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-blue-500'
                                  }` }
                                >
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null }
                            </>
                          ) }
                        </Combobox.Option>

                  ) }
                </Combobox.Options>
            }

          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default ContactSearch;