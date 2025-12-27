// Example Page.jsx
import React from "react";
import Header from "./Header";
import Hero from "./Hero";

const Page = ({ langData, currentLang, onLangChange, onNavigate, currentPage, onShowForm }) => {
  return (
    <>
      <Header
        langData={langData}
        currentLang={currentLang}
        onLangChange={onLangChange}
        onNavigate={onNavigate}
        currentPage={currentPage}
      />
      <Hero langData={langData} onShowForm={onShowForm} />

      {/* Other Sections */}
      <section id="my-farm" className="scroll-mt-24 p-10">
        <h2 className="text-4xl font-bold">My Farm</h2>
        <p>Farm content here...</p>
      </section>

      <section id="todo" className="scroll-mt-24 p-10">
        <h2 className="text-4xl font-bold">Todo</h2>
        <p>Todo content here...</p>
      </section>

      <section id="trend" className="scroll-mt-24 p-10">
        <h2 className="text-4xl font-bold">Trend</h2>
        <p>Trend content here...</p>
      </section>

      <section id="feedback" className="scroll-mt-24 p-10">
        <h2 className="text-4xl font-bold">Feedback</h2>
        <p>Feedback content here...</p>
      </section>
    </>
  );
};

export default Page;
