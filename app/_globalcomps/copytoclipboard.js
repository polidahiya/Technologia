export default function copytoclipboard(text, callbackfunction) {
  navigator.clipboard
    .writeText(text)
    .then(callbackfunction)
    .catch(() => fallbackCopyTextToClipboard(text));
}

const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
};
