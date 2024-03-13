import Image from "next/image";
import MenuItemForm from "../_components/menuItemForm/MenuItemForm";
import { getAllPhotos } from "@/app/actions/MenuItemFormActions";

export default async function AdminEdit() {

  const data = await getAllPhotos()

  return (
    <main>
      <MenuItemForm/>
    </main>
  );
}
