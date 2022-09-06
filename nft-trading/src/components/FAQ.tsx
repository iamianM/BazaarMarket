import FAQRow from "./FAQRow"

function FAQ() {
    return (
        <div className="mt-24">
            <div className="text-center">
                <h1 className="text-5xl font-bold font-poppins">FAQs</h1>
                <p className="font-poppins text-lg">Any questions?</p>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4 p-2">
                <FAQRow tabIndex={0} />
                <FAQRow tabIndex={1} />
                <FAQRow tabIndex={2} />
                <FAQRow tabIndex={3} />
                <FAQRow tabIndex={4} />
                <FAQRow tabIndex={5} />
            </div>
        </div>
    )
}

export default FAQ