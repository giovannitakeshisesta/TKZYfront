import React, { useState } from "react";
import MenuDetails from "../components/MenuDetails";
import MenuForm    from "../components/MenuForm";
import MenuDND     from "../components/MenuDND";

export default function MenuPage() {
  const [openMenuForm, setOpenMenuForm] = useState(false);
  const [openMenuList, setOpenMenuList] = useState(true)
  const [openMenuDetails, setOpenMenuDetails]= useState(false)
  const [prefillValues, setPrefillValues] = useState(false)

  const toggleComponent = () => {
    setOpenMenuForm(!openMenuForm)
    setOpenMenuList(!openMenuList)
    setPrefillValues(false)
  }

  const openDetails = (data) => {
    setOpenMenuDetails(data)
    setOpenMenuList(false)
    setOpenMenuForm(false)
  }

  const closeDetails = () => {
    setOpenMenuDetails(false)
    setOpenMenuForm(false)
    setPrefillValues(false)
    setOpenMenuList(true)
  }

  const editItem = (data) => {
    setOpenMenuDetails(false)
    setPrefillValues(data)
    setOpenMenuForm(true)
  }

  return (
    <div className="menuPageMain">
      {openMenuList && 
      <MenuDND toggleComponent={toggleComponent} openDetails={openDetails}/>
      }

      {openMenuForm && 
      <MenuForm toggleComponent={toggleComponent} openDetails={openDetails} prefillValues={prefillValues}  />
      }

      {openMenuDetails && 
      <MenuDetails data={openMenuDetails} closeDetails={closeDetails} editItem={editItem}/>
      }
    </div>
  );
}
