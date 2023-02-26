import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

// the form card that shows when the user is in the process of booking an appointment
export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // resets the student and interviewer 
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // cancels the in-progress appointment
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // shows errors if the user does not input a student or interviewer
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    };

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    };

    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};