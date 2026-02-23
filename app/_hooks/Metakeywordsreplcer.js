export default function Metakeywordsreplacer(str) {
  const currentYear = new Date().getFullYear();
  return str?.replace(/--year/g, currentYear);
}
