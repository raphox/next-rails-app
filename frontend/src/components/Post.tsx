import React from "react";

export interface Props {
  id: string;
  title: string;
  body: string;
}

export default function Post(props: Props) {
  return (
    <>
      <p>
        <b>title:</b> {props.title}
      </p>
      <p>
        <b>body:</b> {props.body}
      </p>
    </>
  );
}
