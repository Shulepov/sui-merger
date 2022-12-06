import React, { useState } from "react";

const About = (props: any) => {
  const [opened, setOpened] = useState<boolean>();

  function content() {
    return (
      <div className="absolute top-0 left-0 h-screen w-screen z-10 backdrop-blur flex flex-column justify-center items-center">
        <div className="bg-dark-2 lg:w-1/2 md:w-3/5 sm:w-full m-4 p-4 rounded-lg border border-gray-600">
          <h2 className="font-semibold text-center text-2xl">About</h2>
          <p className="mt-4 mb-8">
            In SUI everything is object-represented. Including coins.
            <br />
            Sometimes you have enough COINs but one of them or even each one has
            a value less than you need.
            <br />
            In that case you need to merge some coins.
            <br />
            Sometimes you need to send a COIN with an exact value - in this case
            you may need to split your COIN.
            <br />
            <br />
            <hr />
            <br />
            <strong>How it works:</strong>
            <br />
            <strong>1.</strong> Select coins you want to merge in INPUT section.
            <br />
            <strong>2.</strong> Leave OUTPUT section as is if you just want to
            merge. Or specify some amounts to split.
            <br />
            <strong>2.1.</strong> You can merge & split at the same time.
            <br />
            <strong>3.</strong> Press PERFORM to execute transaction.
            <br />
          </p>
          <div className="flex justify-center">
            <button
              className="lg:w-1/2 w-full p-4 bg-blue-1 hover:bg-blue-2 rounded-lg"
              onClick={() => setOpened(false)}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <button
        className="font-mono hover:text-gray-300"
        onClick={() => setOpened(!opened)}
      >
        ?
      </button>
      {opened ? content() : null}
    </div>
  );
};

export default About;
