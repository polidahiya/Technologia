import { Getautofillvalues } from "@/lib/autofillvaluesfn";
import Clientpage from "./Clientpage";

async function page() {
  const catalog = await Getautofillvalues();

  return <Clientpage catalog={catalog}/>
 
}

export default page;
