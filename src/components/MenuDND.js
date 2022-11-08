import React, { useEffect, useState } from "react";
import { getDNDmenu, patchDNDmenu } from "../services/MenuService";
import DNDsingle from "./DNDsingle";
import { toTitle } from "../functions/misc.functions";

export default function MenuDND({ toggleComponent, openDetails }) {
  const initialState = {
    starters: { item: [] },
    main_courses: { item: [] },
    desserts: { item: [] },
    drinks: { item: [] },
  };

  const [menuList, setMenuList] = useState(initialState);
  const [foodlist, setFoodList] = useState([]);
  const [drinklist, setDrinkList] = useState([]);

  const getMenu = () => {
    getDNDmenu()
      .then((response) => {
        const { starters, main_courses, desserts, drinks } = response[0];
        setMenuList({ starters, main_courses, desserts, drinks });
        setFoodList({ starters, main_courses, desserts });
        setDrinkList(drinks.item);
      })
      .catch((err) => console.log(err));
  };

  const updateApi = (newArr, previousState, name) => {
    menuList[name].item = newArr;
    setMenuList({ ...menuList });
    getMenu();

    patchDNDmenu(menuList)
      .then(() => {})
      .catch(() => {
        menuList[name].item = previousState.current;
        setMenuList({ ...menuList });
      });
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <div className="menuListMain">
      <h2 className="center">Menu</h2>
      <i
        className="fas fa-plus-circle topBtnStyle topRightPosition"
        onClick={() => toggleComponent()}
      ></i>

      <div className="menuListColumns">
        <div className="typeColumn">
          {foodlist &&
            Object.entries(foodlist).map((el, index) => {
              return (
                <div key={index}>
                  <h4 className="titleCourses">{toTitle(el[0])}</h4>
                  <DNDsingle
                    name={el[0]}
                    list={el[1].item}
                    openDetails={openDetails}
                    updateApi={updateApi}
                  />
                </div>
              );
            })}
        </div>

        <div className="typeColumn">
          {drinklist && (
            <>
              <h4 className="titleCourses">Drinks</h4>
              <DNDsingle
                name="drinks"
                list={drinklist}
                openDetails={openDetails}
                updateApi={updateApi}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
