import React from "react";

import { Props as Post } from "./Post";

export interface Props {
  id: string;
  post: Post;
  message: string;
}

export default function Comment(props: Props) {
  return (
    <>
      <p>
        <b>post:</b> {props.post ? `${props.post.title} - ${props.post.id}` : "Loading..."}
      </p>
      <p>
        <b>message:</b> {props.message}
      </p>
    </>
  );
}
