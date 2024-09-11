"use client";

import { useFormState } from "react-dom";
import FormButton from "@/components/form-button/form-button";
import * as actions from "@/actions";
import Link from "next/link";
import paths from "@/paths";

export default function CreateAlbumForm() {
  const [formState, action] = useFormState(actions.createAlbum, { errors: {} });

  return (
    <>
      <div className='form-container'>
        <form action={action}>
          <h3>Add a new album</h3>
          <div className='form-wrapper'>
            <div className='input-wrapper'>
              <label>Album title</label>
              <input
                type='text'
                name='title'
                id='title'
                placeholder='Album title'
              />
              {formState?.errors.title && <div>{formState?.errors.title}</div>}
              <label>Album description</label>
              <textarea
                name='description'
                id='description'
                placeholder='Write a brief description'
                rows={10}
              />
              {formState?.errors.description && (
                <div>{formState?.errors.description}</div>
              )}
            </div>
            {formState?.errors.files && <div>{formState?.errors.files}</div>}
            <div className='button-wrapper'>
              <FormButton buttonType='submit' buttonStyle=' btn primary'>
                Submit
              </FormButton>
              <Link href={paths.photos()}>
                <FormButton buttonStyle='btn cancel'>Cancel</FormButton>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
