import Link from "next/link"
import { auth } from "../_lib/auth"
import NavigationHamburgur from "@/app/_components/NavigationHamburgur"

export default async function Navigation() {
  const session = await auth()
  

  return <NavigationHamburgur session={session}/>
}
