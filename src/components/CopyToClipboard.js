import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CopyToClipboardSnackbar = ({ text }) => {
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!', { position: toast.POSITION.BOTTOM_RIGHT });
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
    }
  };

  return (
    <div>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
    </div>
  );
};

export default CopyToClipboardSnackbar;
