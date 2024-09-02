import { useFormState } from "react-dom";
import { uploadFile } from "./actions";
import { SubmitButton } from "./submit-button";

const initialState = { message: null };

export default function UploadForm() {
  const [state, formAction] = useFormState(uploadFile, initialState);
  return (
    <div className='form-wrapper'>
      <form action={formAction}>
        <input type='file' name='file' accept='images/*'></input>
        <SubmitButton />
      </form>
      {state?.status && <div>{state?.message}</div>}
    </div>
  );
}
