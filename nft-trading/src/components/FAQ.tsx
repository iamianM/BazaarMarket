import FAQRow from "./FAQRow"

function FAQ() {
    return (
        <div className="mt-24">
            <div className="text-center">
                <h1 className="text-5xl font-bold font-poppins">FAQs</h1>
                <p className="font-poppins text-lg mt-5">Any questions?</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10">
                <FAQRow />
                <FAQRow />
                <FAQRow />
                <FAQRow />
                <FAQRow />
                <FAQRow />
            </div>
        </div>
    )
}

export default FAQ