import {Dispatch, SetStateAction} from "react";

enum InputType {
    text = "text",
    number = "number"
}

function InputComponent(label: String, value: string, setter: Dispatch<SetStateAction<string>>, type: InputType = InputType.text) {
    return (
        <div className={'w-1/5'}>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                { label }
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    type={type}
                    value={value}
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={event => setter(event.target.value)}
                />
            </div>
        </div>
    )
}

export { InputComponent, InputType }