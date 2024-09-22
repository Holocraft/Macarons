"use client";

import { useFormState } from "react-dom";
import FormButton from "../form-button/form-button";
import * as actions from "@/actions";

export default function CommentInput({ albumId }) {
  const [formState, action] = useFormState(actions.createComment, {
    errors: {},
  });

  return (
    <form action={action}>
      <input type='hidden' name='albumId' value={albumId} />
      <div className='comment-input-container'>
        <textarea
          className='comment-input'
          name='comment'
          id='comment'
          placeholder='Add a comment'
          rows={10}
        />
        {formState?.errors.comment && <div>{formState?.errors.comment}</div>}
        <FormButton buttonType='submit' buttonStyle=' btn primary'>
          Submit
        </FormButton>
      </div>
    </form>
  );
}
