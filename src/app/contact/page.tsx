"use client";

import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import FormButton from "@/components/form-button/form-button";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <div className='contact-form-wrapper'>
      <h1>Fill out the form to request access</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='contact-form'>
        <div>
          <label htmlFor='name'>Full Name</label>
          <input
            type='text'
            placeholder='Full Name'
            {...register("name", { required: true })}
          />
        </div>
        <div>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            placeholder='example@domain.com'
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <label htmlFor='message'>Message</label>
          <textarea
            rows={4}
            placeholder='Tell us who you are and who your little Macaron is!'
            {...register("message", { required: true })}
          ></textarea>
        </div>
        <div>
          <FormButton buttonType='submit' buttonStyle='btn primary'>
            Submit
          </FormButton>
        </div>
      </form>
    </div>
  );
}
