import Button from "../button/button";

type ConfirmationModalProps = {
  title: string;
  buttonText: string;
  onClick: () => void;
  cancel: () => void;
};

export default function ConfirmationModal({
  title,
  buttonText,
  onClick,
  cancel,
}: ConfirmationModalProps) {
  return (
    <>
      <div className='mask' />
      <div className='confirmation-modal-wrapper'>
        <div className='confirmation-modal'>
          <h2>{title}</h2>
          <div className='button-wrapper'>
            <Button buttonStyle='btn delete' onClick={onClick}>
              {buttonText}
            </Button>
            <Button buttonStyle='btn cancel' onClick={cancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
